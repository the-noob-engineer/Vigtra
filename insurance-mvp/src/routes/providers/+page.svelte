<script lang="ts">
  import { 
    Plus, 
    Search, 
    Filter, 
    Download,
    Eye,
    Edit,
    MapPin,
    Phone,
    Mail,
    Building2,
    Users,
    Star,
    CheckCircle,
    XCircle
  } from 'lucide-svelte';

  interface Provider {
    id: string;
    name: string;
    type: 'hospital' | 'clinic' | 'pharmacy' | 'laboratory';
    email: string;
    phone: string;
    address: string;
    city: string;
    status: 'active' | 'inactive' | 'pending';
    rating: number;
    totalClaims: number;
    contractDate: string;
    specialties: string[];
  }

  // Mock data
  let providers: Provider[] = [
    {
      id: '1',
      name: 'Metro General Hospital',
      type: 'hospital',
      email: 'admin@metrogh.com',
      phone: '+1 234 567 8900',
      address: '123 Medical Center Dr',
      city: 'New York, NY',
      status: 'active',
      rating: 4.8,
      totalClaims: 1247,
      contractDate: '2023-01-15',
      specialties: ['Emergency Care', 'Cardiology', 'Orthopedics']
    },
    {
      id: '2',
      name: 'City Medical Center',
      type: 'clinic',
      email: 'info@citymedical.com',
      phone: '+1 234 567 8901',
      address: '456 Health St',
      city: 'Boston, MA',
      status: 'active',
      rating: 4.6,
      totalClaims: 892,
      contractDate: '2023-03-20',
      specialties: ['General Practice', 'Pediatrics']
    },
    {
      id: '3',
      name: 'Dental Care Clinic',
      type: 'clinic',
      email: 'contact@dentalcare.com',
      phone: '+1 234 567 8902',
      address: '789 Smile Ave',
      city: 'Chicago, IL',
      status: 'pending',
      rating: 4.4,
      totalClaims: 234,
      contractDate: '2024-02-10',
      specialties: ['General Dentistry', 'Orthodontics']
    },
    {
      id: '4',
      name: 'Central Pharmacy',
      type: 'pharmacy',
      email: 'orders@centralpharm.com',
      phone: '+1 234 567 8903',
      address: '321 Prescription Blvd',
      city: 'Miami, FL',
      status: 'active',
      rating: 4.7,
      totalClaims: 2156,
      contractDate: '2022-11-05',
      specialties: ['Prescription Drugs', 'Medical Supplies']
    }
  ];

  let searchTerm = '';
  let statusFilter = 'all';
  let typeFilter = 'all';

  $: filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || provider.status === statusFilter;
    const matchesType = typeFilter === 'all' || provider.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
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

  function getTypeIcon(type: string) {
    switch (type) {
      case 'hospital':
        return Building2;
      case 'clinic':
        return Building2;
      case 'pharmacy':
        return Building2;
      case 'laboratory':
        return Building2;
      default:
        return Building2;
    }
  }

  function getTypeColor(type: string) {
    switch (type) {
      case 'hospital':
        return 'bg-blue-100 text-blue-800';
      case 'clinic':
        return 'bg-green-100 text-green-800';
      case 'pharmacy':
        return 'bg-purple-100 text-purple-800';
      case 'laboratory':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function renderStars(rating: number) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return { fullStars, hasHalfStar };
  }
</script>

<svelte:head>
  <title>Healthcare Providers - InsuranceOS</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Healthcare Providers</h1>
      <p class="mt-2 text-gray-600">Manage healthcare providers and their contracts</p>
    </div>
    <div class="mt-4 sm:mt-0">
      <a href="/providers/new" class="btn btn-primary btn-md">
        <Plus class="mr-2 h-4 w-4" />
        Add Provider
      </a>
    </div>
  </div>

  <!-- Stats cards -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-4">
    <div class="card text-center">
      <div class="text-2xl font-bold text-gray-900">
        {providers.filter(p => p.status === 'active').length}
      </div>
      <div class="text-sm text-gray-600">Active Providers</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-gray-900">
        {providers.filter(p => p.status === 'pending').length}
      </div>
      <div class="text-sm text-gray-600">Pending Approval</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-gray-900">
        {providers.reduce((sum, p) => sum + p.totalClaims, 0).toLocaleString()}
      </div>
      <div class="text-sm text-gray-600">Total Claims</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-gray-900">
        {(providers.reduce((sum, p) => sum + p.rating, 0) / providers.length).toFixed(1)}
      </div>
      <div class="text-sm text-gray-600">Avg. Rating</div>
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
            placeholder="Search providers..."
            class="input pl-10 w-64"
          />
        </div>
        <select bind:value={statusFilter} class="input w-40">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
        <select bind:value={typeFilter} class="input w-40">
          <option value="all">All Types</option>
          <option value="hospital">Hospital</option>
          <option value="clinic">Clinic</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="laboratory">Laboratory</option>
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

  <!-- Providers grid -->
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
    {#each filteredProviders as provider}
      <div class="card hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-3">
            <div class="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
              <svelte:component this={getTypeIcon(provider.type)} class="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{provider.name}</h3>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getTypeColor(provider.type)}">
                {provider.type}
              </span>
            </div>
          </div>
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getStatusColor(provider.status)}">
            {provider.status}
          </span>
        </div>

        <div class="mt-4 space-y-3">
          <div class="flex items-center text-sm text-gray-600">
            <MapPin class="h-4 w-4 mr-2" />
            <span>{provider.address}, {provider.city}</span>
          </div>
          
          <div class="flex items-center text-sm text-gray-600">
            <Phone class="h-4 w-4 mr-2" />
            <span>{provider.phone}</span>
          </div>
          
          <div class="flex items-center text-sm text-gray-600">
            <Mail class="h-4 w-4 mr-2" />
            <span>{provider.email}</span>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              {#each Array(renderStars(provider.rating).fullStars) as _}
                <Star class="h-4 w-4 text-yellow-400 fill-current" />
              {/each}
              {#if renderStars(provider.rating).hasHalfStar}
                <Star class="h-4 w-4 text-yellow-400 fill-current opacity-50" />
              {/if}
              <span class="ml-2 text-sm text-gray-600">{provider.rating}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Users class="h-4 w-4 mr-1" />
              <span>{provider.totalClaims} claims</span>
            </div>
          </div>

          <div class="pt-3 border-t border-gray-200">
            <div class="text-xs text-gray-500 mb-2">Specialties:</div>
            <div class="flex flex-wrap gap-1">
              {#each provider.specialties as specialty}
                <span class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                  {specialty}
                </span>
              {/each}
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <button class="text-gray-400 hover:text-gray-600" title="View Details">
              <Eye class="h-4 w-4" />
            </button>
            <button class="text-gray-400 hover:text-gray-600" title="Edit">
              <Edit class="h-4 w-4" />
            </button>
            {#if provider.status === 'pending'}
              <button class="text-green-400 hover:text-green-600" title="Approve">
                <CheckCircle class="h-4 w-4" />
              </button>
            {/if}
            {#if provider.status === 'active'}
              <button class="text-red-400 hover:text-red-600" title="Deactivate">
                <XCircle class="h-4 w-4" />
              </button>
            {/if}
          </div>
          <div class="text-xs text-gray-500">
            Contract: {new Date(provider.contractDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>