<script lang="ts">
  import { 
    Download,
    Calendar,
    TrendingUp,
    Users,
    FileText,
    DollarSign,
    Building2,
    BarChart3,
    PieChart,
    Activity
  } from 'lucide-svelte';
  import ClaimsChart from '$lib/components/ClaimsChart.svelte';

  // Mock data for reports
  const reportMetrics = [
    {
      title: 'Claims Processing Time',
      value: '2.3 days',
      change: '-15%',
      changeType: 'positive' as const,
      description: 'Average time to process claims'
    },
    {
      title: 'Approval Rate',
      value: '87%',
      change: '+5%',
      changeType: 'positive' as const,
      description: 'Percentage of claims approved'
    },
    {
      title: 'Member Satisfaction',
      value: '4.6/5',
      change: '+0.2',
      changeType: 'positive' as const,
      description: 'Average member satisfaction score'
    },
    {
      title: 'Cost per Claim',
      value: '$425',
      change: '-8%',
      changeType: 'positive' as const,
      description: 'Average cost per processed claim'
    }
  ];

  const quickReports = [
    {
      title: 'Monthly Claims Summary',
      description: 'Overview of claims processed this month',
      icon: FileText,
      color: 'blue',
      downloadUrl: '/api/reports/monthly-claims'
    },
    {
      title: 'Beneficiary Enrollment Report',
      description: 'New enrollments and demographics',
      icon: Users,
      color: 'green',
      downloadUrl: '/api/reports/beneficiary-enrollment'
    },
    {
      title: 'Provider Performance',
      description: 'Healthcare provider statistics',
      icon: Building2,
      color: 'purple',
      downloadUrl: '/api/reports/provider-performance'
    },
    {
      title: 'Financial Summary',
      description: 'Revenue, costs, and profitability',
      icon: DollarSign,
      color: 'orange',
      downloadUrl: '/api/reports/financial-summary'
    },
    {
      title: 'Utilization Analysis',
      description: 'Service utilization patterns',
      icon: BarChart3,
      color: 'indigo',
      downloadUrl: '/api/reports/utilization-analysis'
    },
    {
      title: 'Risk Assessment',
      description: 'Risk factors and predictions',
      icon: Activity,
      color: 'red',
      downloadUrl: '/api/reports/risk-assessment'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    indigo: 'bg-indigo-500',
    red: 'bg-red-500'
  };

  let selectedDateRange = 'last_30_days';
  let reportFormat = 'pdf';

  function downloadReport(url: string) {
    // In a real app, this would trigger a download
    console.log(`Downloading report from ${url}`);
  }
</script>

<svelte:head>
  <title>Reports & Analytics - InsuranceOS</title>
</svelte:head>

<div class="space-y-8">
  <!-- Page header -->
  <div>
    <h1 class="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
    <p class="mt-2 text-gray-600">Generate insights and reports from your insurance data</p>
  </div>

  <!-- Report controls -->
  <div class="card">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <Calendar class="h-5 w-5 text-gray-400" />
          <select bind:value={selectedDateRange} class="input">
            <option value="last_7_days">Last 7 days</option>
            <option value="last_30_days">Last 30 days</option>
            <option value="last_90_days">Last 90 days</option>
            <option value="last_year">Last year</option>
            <option value="custom">Custom range</option>
          </select>
        </div>
        <select bind:value={reportFormat} class="input">
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
        </select>
      </div>
      <div class="flex items-center space-x-2">
        <button class="btn btn-outline btn-md">
          <Calendar class="mr-2 h-4 w-4" />
          Schedule Report
        </button>
        <button class="btn btn-primary btn-md">
          <Download class="mr-2 h-4 w-4" />
          Generate Custom Report
        </button>
      </div>
    </div>
  </div>

  <!-- Key metrics -->
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Key Performance Metrics</h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {#each reportMetrics as metric}
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{metric.title}</p>
              <p class="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <div class="flex items-center mt-1">
                <TrendingUp class="h-4 w-4 text-green-500 mr-1" />
                <span class="text-sm text-green-600">{metric.change}</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">{metric.description}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Charts section -->
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <!-- Claims overview chart -->
    <div class="card">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Claims Trend Analysis</h3>
        <p class="text-sm text-gray-600">Monthly claims processing trends</p>
      </div>
      <ClaimsChart />
    </div>

    <!-- Distribution chart placeholder -->
    <div class="card">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Service Distribution</h3>
        <p class="text-sm text-gray-600">Claims by service type</p>
      </div>
      <div class="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
        <div class="text-center">
          <PieChart class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500">Pie chart visualization</p>
          <p class="text-sm text-gray-400">Service type distribution</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick reports -->
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Reports</h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each quickReports as report}
        <div class="card hover:shadow-md transition-shadow cursor-pointer" on:click={() => downloadReport(report.downloadUrl)}>
          <div class="flex items-start space-x-4">
            <div class="h-12 w-12 rounded-lg {colorClasses[report.color]} flex items-center justify-center flex-shrink-0">
              <svelte:component this={report.icon} class="h-6 w-6 text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-gray-900">{report.title}</h3>
              <p class="text-sm text-gray-600 mt-1">{report.description}</p>
              <div class="mt-4 flex items-center text-sm text-primary-600 hover:text-primary-700">
                <Download class="h-4 w-4 mr-1" />
                <span>Download Report</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Recent reports -->
  <div class="card">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Recent Reports</h3>
      <p class="text-sm text-gray-600">Recently generated reports and schedules</p>
    </div>
    
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Report Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Generated Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Format
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">Monthly Claims Summary - March 2024</div>
              <div class="text-sm text-gray-500">Comprehensive claims analysis</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Mar 15, 2024
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              PDF
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Ready
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-primary-600 hover:text-primary-700">
                <Download class="h-4 w-4" />
              </button>
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">Provider Performance Q1 2024</div>
              <div class="text-sm text-gray-500">Quarterly provider metrics</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Mar 14, 2024
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Excel
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Processing
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-gray-400 cursor-not-allowed">
                <Download class="h-4 w-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>