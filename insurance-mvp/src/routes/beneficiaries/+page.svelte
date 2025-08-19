<script lang="ts">
  import { 
    Plus, 
    Search, 
    Filter, 
    Download,
    Eye,
    Edit,
    Trash2,
    UserCheck,
    UserX,
    Calendar
  } from 'lucide-svelte';
  import { format } from 'date-fns';

  interface Beneficiary {
    id: string;
    name: string;
    email: string;
    phone: string;
    membershipId: string;
    status: 'active' | 'inactive' | 'pending';
    enrollmentDate: string;
    scheme: string;
    dependents: number;
  }

  // Mock data - in real app this would come from API
  let beneficiaries: Beneficiary[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 234 567 8900',
      membershipId: 'MEM-2024-001',
      status: 'active',
      enrollmentDate: '2024-01-15',
      scheme: 'Basic Health Coverage',
      dependents: 3
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 234 567 8901',
      membershipId: 'MEM-2024-002',
      status: 'active',
      enrollmentDate: '2024-02-03',
      scheme: 'Premium Health Coverage',
      dependents: 1
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+1 234 567 8902',
      membershipId: 'MEM-2024-003',
      status: 'pending',
      enrollmentDate: '2024-03-10',
      scheme: 'Basic Health Coverage',
      dependents: 2
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 234 567 8903',
      membershipId: 'MEM-2024-004',
      status: 'inactive',
      enrollmentDate: '2023-11-20',
      scheme: 'Premium Health Coverage',
      dependents: 0
    }
  ];

  let searchTerm = '';
  let statusFilter = 'all';

  $: filteredBeneficiaries = beneficiaries.filter(beneficiary => {
    const matchesSearch = beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beneficiary.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beneficiary.membershipId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || beneficiary.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  function getStatusColor(status: string) {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function formatDate(dateString: string) {
    return format(new Date(dateString), 'MMM dd, yyyy');
  }
</script>

<svelte:head>
  <title>Beneficiaries - InsuranceOS</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Beneficiaries</h1>
      <p class="mt-2 text-gray-600">Manage insurance beneficiaries and their enrollment</p>
    </div>
    <div class="mt-4 sm:mt-0">
      <a href="/beneficiaries/new" class="btn btn-primary btn-md">
        <Plus class="mr-2 h-4 w-4" />
        Add Beneficiary
      </a>
    </div>
  </div>

  <!-- Stats cards -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-4">
    <div class="card text-center">
      <div class="text-2xl font-bold text-gray-900">
        {beneficiaries.filter(b => b.status === 'active').length}
      </div>
      <div class="text-sm text-gray-600">Active Members</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-gray-900">
        {beneficiaries.filter(b => b.status === 'pending').length}
      </div>
      <div class="text-sm text-gray-600">Pending Approval</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-gray-900">
        {beneficiaries.reduce((sum, b) => sum + b.dependents, 0)}
      </div>
      <div class="text-sm text-gray-600">Total Dependents</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-gray-900">
        {new Set(beneficiaries.map(b => b.scheme)).size}
      </div>
      <div class="text-sm text-gray-600">Active Schemes</div>
    </div>
  </div>

  <!-- Filters and search -->
  <div class="card">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search class="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search beneficiaries..."
            class="input pl-10 w-64"
          />
        </div>
        <select bind:value={statusFilter} class="input w-40">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div class="flex items-center space-x-2">
        <button class="btn btn-outline btn-sm">
          <Filter class="mr-2 h-4 w-4" />
          More Filters
        </button>
        <button class="btn btn-outline btn-sm">
          <Download class="mr-2 h-4 w-4" />
          Export
        </button>
      </div>
    </div>
  </div>

  <!-- Beneficiaries table -->
  <div class="card p-0">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Member
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Membership ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Scheme
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Enrollment Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dependents
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each filteredBeneficiaries as beneficiary}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-700">
                      {beneficiary.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{beneficiary.name}</div>
                    <div class="text-sm text-gray-500">{beneficiary.email}</div>
                    <div class="text-sm text-gray-500">{beneficiary.phone}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-mono text-gray-900">{beneficiary.membershipId}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getStatusColor(beneficiary.status)}">
                  {beneficiary.status}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {beneficiary.scheme}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(beneficiary.enrollmentDate)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {beneficiary.dependents}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button class="text-gray-400 hover:text-gray-600" title="View Details">
                    <Eye class="h-4 w-4" />
                  </button>
                  <button class="text-gray-400 hover:text-gray-600" title="Edit">
                    <Edit class="h-4 w-4" />
                  </button>
                  {#if beneficiary.status === 'pending'}
                    <button class="text-green-400 hover:text-green-600" title="Approve">
                      <UserCheck class="h-4 w-4" />
                    </button>
                  {/if}
                  {#if beneficiary.status === 'active'}
                    <button class="text-red-400 hover:text-red-600" title="Deactivate">
                      <UserX class="h-4 w-4" />
                    </button>
                  {/if}
                  <button class="text-red-400 hover:text-red-600" title="Delete">
                    <Trash2 class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Pagination -->
  <div class="flex items-center justify-between">
    <div class="text-sm text-gray-700">
      Showing <span class="font-medium">1</span> to <span class="font-medium">{filteredBeneficiaries.length}</span> of{' '}
      <span class="font-medium">{filteredBeneficiaries.length}</span> results
    </div>
    <div class="flex items-center space-x-2">
      <button class="btn btn-outline btn-sm" disabled>Previous</button>
      <button class="btn btn-primary btn-sm">1</button>
      <button class="btn btn-outline btn-sm" disabled>Next</button>
    </div>
  </div>
</div>