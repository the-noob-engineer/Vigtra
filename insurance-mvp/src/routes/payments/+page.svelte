<script lang="ts">
  import { 
    Plus, 
    Search, 
    Filter, 
    Download,
    Eye,
    DollarSign,
    Calendar,
    Building2,
    User,
    CheckCircle,
    Clock,
    XCircle,
    ArrowUpRight,
    ArrowDownRight
  } from 'lucide-svelte';
  import { format } from 'date-fns';

  interface Payment {
    id: string;
    paymentId: string;
    type: 'claim_reimbursement' | 'provider_payment' | 'beneficiary_refund';
    recipient: string;
    recipientType: 'provider' | 'beneficiary';
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    method: 'bank_transfer' | 'check' | 'digital_wallet';
    claimNumber?: string;
    processedDate?: string;
    scheduledDate: string;
    description: string;
  }

  // Mock data
  let payments: Payment[] = [
    {
      id: '1',
      paymentId: 'PAY-2024-001',
      type: 'claim_reimbursement',
      recipient: 'Metro General Hospital',
      recipientType: 'provider',
      amount: 1250.00,
      status: 'completed',
      method: 'bank_transfer',
      claimNumber: 'CLM-2024-001',
      processedDate: '2024-03-16',
      scheduledDate: '2024-03-16',
      description: 'Emergency Room Visit reimbursement'
    },
    {
      id: '2',
      paymentId: 'PAY-2024-002',
      type: 'provider_payment',
      recipient: 'City Medical Center',
      recipientType: 'provider',
      amount: 180.00,
      status: 'pending',
      method: 'bank_transfer',
      claimNumber: 'CLM-2024-002',
      scheduledDate: '2024-03-20',
      description: 'Routine Checkup payment'
    },
    {
      id: '3',
      paymentId: 'PAY-2024-003',
      type: 'beneficiary_refund',
      recipient: 'John Doe',
      recipientType: 'beneficiary',
      amount: 75.00,
      status: 'completed',
      method: 'digital_wallet',
      processedDate: '2024-03-15',
      scheduledDate: '2024-03-15',
      description: 'Overpayment refund for prescription'
    },
    {
      id: '4',
      paymentId: 'PAY-2024-004',
      type: 'claim_reimbursement',
      recipient: 'Central Pharmacy',
      recipientType: 'provider',
      amount: 95.00,
      status: 'failed',
      method: 'bank_transfer',
      claimNumber: 'CLM-2024-004',
      scheduledDate: '2024-03-18',
      description: 'Prescription medication reimbursement'
    }
  ];

  let searchTerm = '';
  let statusFilter = 'all';
  let typeFilter = 'all';

  $: filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  function getStatusColor(status: string) {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return XCircle;
      case 'cancelled':
        return XCircle;
      default:
        return Clock;
    }
  }

  function getTypeColor(type: string) {
    switch (type) {
      case 'claim_reimbursement':
        return 'bg-blue-100 text-blue-800';
      case 'provider_payment':
        return 'bg-purple-100 text-purple-800';
      case 'beneficiary_refund':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getTypeLabel(type: string) {
    switch (type) {
      case 'claim_reimbursement':
        return 'Claim Reimbursement';
      case 'provider_payment':
        return 'Provider Payment';
      case 'beneficiary_refund':
        return 'Beneficiary Refund';
      default:
        return type;
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

  function getMethodLabel(method: string) {
    switch (method) {
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'digital_wallet':
        return 'Digital Wallet';
      case 'check':
        return 'Check';
      default:
        return method;
    }
  }
</script>

<svelte:head>
  <title>Payments - InsuranceOS</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Payments</h1>
      <p class="mt-2 text-gray-600">Manage payments and reimbursements</p>
    </div>
    <div class="mt-4 sm:mt-0">
      <a href="/payments/new" class="btn btn-primary btn-md">
        <Plus class="mr-2 h-4 w-4" />
        New Payment
      </a>
    </div>
  </div>

  <!-- Stats cards -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-4">
    <div class="card text-center">
      <div class="text-2xl font-bold text-green-600">
        {formatCurrency(payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0))}
      </div>
      <div class="text-sm text-gray-600">Completed</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-yellow-600">
        {formatCurrency(payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0))}
      </div>
      <div class="text-sm text-gray-600">Pending</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-red-600">
        {formatCurrency(payments.filter(p => p.status === 'failed').reduce((sum, p) => sum + p.amount, 0))}
      </div>
      <div class="text-sm text-gray-600">Failed</div>
    </div>
    <div class="card text-center">
      <div class="text-2xl font-bold text-gray-900">
        {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0))}
      </div>
      <div class="text-sm text-gray-600">Total</div>
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
            placeholder="Search payments..."
            class="input pl-10 w-64"
          />
        </div>
        <select bind:value={statusFilter} class="input w-40">
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select bind:value={typeFilter} class="input w-48">
          <option value="all">All Types</option>
          <option value="claim_reimbursement">Claim Reimbursement</option>
          <option value="provider_payment">Provider Payment</option>
          <option value="beneficiary_refund">Beneficiary Refund</option>
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

  <!-- Payments table -->
  <div class="card p-0">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Details
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Recipient
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Method
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
          {#each filteredPayments as payment}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{payment.paymentId}</div>
                  <div class="text-sm text-gray-500">{payment.description}</div>
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getTypeColor(payment.type)} mt-1">
                    {getTypeLabel(payment.type)}
                  </span>
                  {#if payment.claimNumber}
                    <div class="text-xs text-gray-400 mt-1">Claim: {payment.claimNumber}</div>
                  {/if}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  {#if payment.recipientType === 'provider'}
                    <Building2 class="h-4 w-4 text-gray-400 mr-2" />
                  {:else}
                    <User class="h-4 w-4 text-gray-400 mr-2" />
                  {/if}
                  <div>
                    <div class="text-sm font-medium text-gray-900">{payment.recipient}</div>
                    <div class="text-sm text-gray-500 capitalize">{payment.recipientType}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <DollarSign class="h-4 w-4 text-gray-400 mr-1" />
                  <div class="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <svelte:component this={getStatusIcon(payment.status)} class="h-4 w-4 mr-2 {
                    payment.status === 'completed' ? 'text-green-500' :
                    payment.status === 'failed' ? 'text-red-500' :
                    'text-yellow-500'
                  }" />
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getStatusColor(payment.status)}">
                    {payment.status}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getMethodLabel(payment.method)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <Calendar class="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <div>Scheduled: {formatDate(payment.scheduledDate)}</div>
                    {#if payment.processedDate}
                      <div class="text-gray-500">Processed: {formatDate(payment.processedDate)}</div>
                    {/if}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button class="text-gray-400 hover:text-gray-600" title="View Details">
                    <Eye class="h-4 w-4" />
                  </button>
                  {#if payment.status === 'pending'}
                    <button class="text-blue-400 hover:text-blue-600" title="Process Payment">
                      <ArrowUpRight class="h-4 w-4" />
                    </button>
                  {/if}
                  {#if payment.status === 'failed'}
                    <button class="text-green-400 hover:text-green-600" title="Retry Payment">
                      <ArrowUpRight class="h-4 w-4" />
                    </button>
                  {/if}
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
      Showing <span class="font-medium">1</span> to <span class="font-medium">{filteredPayments.length}</span> of{' '}
      <span class="font-medium">{filteredPayments.length}</span> results
    </div>
    <div class="flex items-center space-x-2">
      <button class="btn btn-outline btn-sm" disabled>Previous</button>
      <button class="btn btn-primary btn-sm">1</button>
      <button class="btn btn-outline btn-sm" disabled>Next</button>
    </div>
  </div>
</div>