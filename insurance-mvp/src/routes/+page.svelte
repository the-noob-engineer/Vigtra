<script lang="ts">
  import { 
    Users, 
    FileText, 
    Building2, 
    CreditCard, 
    TrendingUp, 
    TrendingDown,
    AlertCircle,
    CheckCircle,
    Clock,
    DollarSign
  } from 'lucide-svelte';
  import StatsCard from '$lib/components/StatsCard.svelte';
  import RecentActivity from '$lib/components/RecentActivity.svelte';
  import ClaimsChart from '$lib/components/ClaimsChart.svelte';

  // Mock data - in real app this would come from API
  const stats = [
    {
      title: 'Total Beneficiaries',
      value: '12,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Claims',
      value: '1,234',
      change: '+8%',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Healthcare Providers',
      value: '89',
      change: '+3%',
      changeType: 'positive' as const,
      icon: Building2,
      color: 'purple'
    },
    {
      title: 'Monthly Payouts',
      value: '$2.4M',
      change: '-2%',
      changeType: 'negative' as const,
      icon: CreditCard,
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'claim_approved',
      message: 'Claim #CLM-2024-001 approved for John Doe',
      time: '2 minutes ago',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    {
      id: '2',
      type: 'beneficiary_enrolled',
      message: 'New beneficiary Sarah Johnson enrolled',
      time: '15 minutes ago',
      icon: Users,
      iconColor: 'text-blue-500'
    },
    {
      id: '3',
      type: 'claim_pending',
      message: 'Claim #CLM-2024-002 requires review',
      time: '1 hour ago',
      icon: Clock,
      iconColor: 'text-yellow-500'
    },
    {
      id: '4',
      type: 'payment_processed',
      message: 'Payment of $1,250 processed to Metro Hospital',
      time: '2 hours ago',
      icon: DollarSign,
      iconColor: 'text-green-500'
    },
    {
      id: '5',
      type: 'claim_rejected',
      message: 'Claim #CLM-2024-003 rejected - incomplete documentation',
      time: '3 hours ago',
      icon: AlertCircle,
      iconColor: 'text-red-500'
    }
  ];

  const alerts = [
    {
      id: '1',
      type: 'warning',
      title: 'High Claim Volume',
      message: 'Claims processing is 23% higher than usual this week',
      action: 'View Details'
    },
    {
      id: '2',
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM',
      action: 'Learn More'
    }
  ];
</script>

<svelte:head>
  <title>Dashboard - InsuranceOS</title>
</svelte:head>

<div class="space-y-8">
  <!-- Page header -->
  <div>
    <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    <p class="mt-2 text-gray-600">Welcome back! Here's what's happening with your insurance operations.</p>
  </div>

  <!-- Stats grid -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {#each stats as stat}
      <StatsCard {...stat} />
    {/each}
  </div>

  <!-- Alerts -->
  {#if alerts.length > 0}
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">Alerts & Notifications</h2>
      <div class="space-y-3">
        {#each alerts as alert}
          <div class="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <AlertCircle class="h-5 w-5 text-yellow-600" />
              </div>
              <div class="ml-3 flex-1">
                <h3 class="text-sm font-medium text-yellow-800">{alert.title}</h3>
                <p class="mt-1 text-sm text-yellow-700">{alert.message}</p>
              </div>
              <div class="ml-3 flex-shrink-0">
                <button class="text-sm font-medium text-yellow-800 hover:text-yellow-900">
                  {alert.action}
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Main content grid -->
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <!-- Claims chart -->
    <div class="lg:col-span-2">
      <div class="card">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Claims Overview</h3>
          <p class="text-sm text-gray-600">Monthly claims processing trends</p>
        </div>
        <ClaimsChart />
      </div>
    </div>

    <!-- Recent activity -->
    <div class="lg:col-span-1">
      <div class="card">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p class="text-sm text-gray-600">Latest system activities</p>
        </div>
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  </div>

  <!-- Quick actions -->
  <div class="card">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
      <p class="text-sm text-gray-600">Common tasks and shortcuts</p>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <a href="/beneficiaries/new" class="btn btn-outline btn-md justify-start">
        <Users class="mr-2 h-4 w-4" />
        Add Beneficiary
      </a>
      <a href="/claims/new" class="btn btn-outline btn-md justify-start">
        <FileText class="mr-2 h-4 w-4" />
        Submit Claim
      </a>
      <a href="/providers/new" class="btn btn-outline btn-md justify-start">
        <Building2 class="mr-2 h-4 w-4" />
        Add Provider
      </a>
      <a href="/reports" class="btn btn-outline btn-md justify-start">
        <TrendingUp class="mr-2 h-4 w-4" />
        View Reports
      </a>
    </div>
  </div>
</div>