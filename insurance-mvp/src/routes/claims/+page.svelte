<script lang="ts">
  import { 
    Plus, 
    Search, 
    Filter, 
    Download,
    Eye,
    Edit,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    Calendar,
    User,
    Building2
  } from 'lucide-svelte';
  import { format } from 'date-fns';

  interface Claim {
    id: string;
    claimNumber: string;
    beneficiary: string;
    provider: string;
    service: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected' | 'processing';
    submissionDate: string;
    reviewDate?: string;
    priority: 'low' | 'medium' | 'high';
  }

  // Mock data
  let claims: Claim[] = [
    {
      id: '1',
      claimNumber: 'CLM-2024-001',
      beneficiary: 'John Doe',
      provider: 'Metro General Hospital',
      service: 'Emergency Room Visit',
      amount: 1250.00,
      status: 'approved',
      submissionDate: '2024-03-15',
      reviewDate: '2024-03-16',
      priority: 'high'
    },
    {
      id: '2',
      claimNumber: 'CLM-2024-002',
      beneficiary: 'Sarah Johnson',
      provider: 'City Medical Center',
      service: 'Routine Checkup',
      amount: 180.00,
      status: 'pending',
      submissionDate: '2024-03-14',
      priority: 'low'
    },
    {
      id: '3',
      claimNumber: 'CLM-2024-003',
      beneficiary: 'Michael Brown',
      provider: 'Dental Care Clinic',
      service: 'Dental Cleaning',
      amount: 120.00,
      status: 'processing',
      submissionDate: '2024-03-13',
      priority: 'medium'
    },
    {
      id: '4',
      claimNumber: 'CLM-2024-004',
      beneficiary: 'Emily Davis',
      provider: 'Vision Care Center',
      service: 'Eye Examination',
      amount: 95.00,
      status: 'rejected',
      submissionDate: '2024-03-12',
      reviewDate: '2024-03-13',
      priority: 'low'
    }
  ];

  let searchTerm = '';
  let statusFilter = 'all';
  let priorityFilter = 'all';

  $: filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || claim.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  function getStatusColor(status: string) {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      case 'pending':
        return Clock;
      case 'processing':
        return Clock;
      default:
        return Clock;
    }
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  function formatDate(dateString: string) {
    return format(new Date(dateString), 'MMM dd, yyyy');
  }
</script>

<svelte:head>
  <title>Claims - InsuranceOS</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Claims Management</h1>
      <p class="mt-2 text-gray-600">Review and process insurance claims</p>
    </div>
    <div class="mt-4 sm:mt-0">
      <a href="/claims/new" class="btn btn-primary btn-md">
        <Plus class="mr-2 h-4 w-4" />
        Submit Claim
      </a>
    </div>
  </div>

  <!-- Stats cards -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-4">
    <div class="card text-center">
      <div class="text-2xl font-bold text-blue-600">
        {claims.filter(c => c.status === 'pending').length}
      </div>
      <div class="text-sm text-gray-600">Pending Review</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-green-600">
        {claims.filter(c => c.status === 'approved').length}
      </div>
      <div class="text-sm text-gray-600">Approved</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-red-600">
        {claims.filter(c => c.status === 'rejected').length}
      </div>
      <div class="text-sm text-gray-600">Rejected</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-gray-900">
        {formatCurrency(claims.reduce((sum, c) => sum + c.amount, 0))}
      </div>
      <div class="text-sm text-gray-600">Total Value</div>
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
            placeholder="Search claims..."
            class="input pl-10 w-64"
          />
        </div>
        <select bind:value={statusFilter} class="input w-40">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select bind:value={priorityFilter} class="input w-40">
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
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

  <!-- Claims table -->
  <div class="card p-0">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Claim Details
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Beneficiary
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Provider
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dates
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each filteredClaims as claim}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{claim.claimNumber}</div>
                  <div class="text-sm text-gray-500">{claim.service}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <User class="h-4 w-4 text-gray-400 mr-2" />
                  <div class="text-sm text-gray-900">{claim.beneficiary}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <Building2 class="h-4 w-4 text-gray-400 mr-2" />
                  <div class="text-sm text-gray-900">{claim.provider}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <DollarSign class="h-4 w-4 text-gray-400 mr-1" />
                  <div class="text-sm font-medium text-gray-900">{formatCurrency(claim.amount)}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <svelte:component this={getStatusIcon(claim.status)} class="h-4 w-4 mr-2 {
                    claim.status === 'approved' ? 'text-green-500' :
                    claim.status === 'rejected' ? 'text-red-500' :
                    'text-yellow-500'
                  }" />
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getStatusColor(claim.status)}">
                    {claim.status}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getPriorityColor(claim.priority)}">
                  {claim.priority}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <Calendar class="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <div>Submitted: {formatDate(claim.submissionDate)}</div>
                    {#if claim.reviewDate}
                      <div class="text-gray-500">Reviewed: {formatDate(claim.reviewDate)}</div>
                    {/if}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button class="text-gray-400 hover:text-gray-600" title="View Details">
                    <Eye class="h-4 w-4" />
                  </button>
                  {#if claim.status === 'pending'}
                    <button class="text-green-400 hover:text-green-600" title="Approve">
                      <CheckCircle class="h-4 w-4" />
                    </button>
                    <button class="text-red-400 hover:text-red-600" title="Reject">
                      <XCircle class="h-4 w-4" />
                    </button>
                  {/if}
                  <button class="text-gray-400 hover:text-gray-600" title="Edit">
                    <Edit class="h-4 w-4" />
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
      Showing <span class="font-medium">1</span> to <span class="font-medium">{filteredClaims.length}</span> of{' '}
      <span class="font-medium">{filteredClaims.length}</span> results
    </div>
    <div class="flex items-center space-x-2">
      <button class="btn btn-outline btn-sm" disabled>Previous</button>
      <button class="btn btn-primary btn-sm">1</button>
      <button class="btn btn-outline btn-sm" disabled>Next</button>
    </div>
  </div>
</div>