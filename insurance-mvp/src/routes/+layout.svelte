<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { 
    Home, 
    Users, 
    FileText, 
    Building2, 
    CreditCard, 
    BarChart3, 
    Settings,
    Bell,
    Search,
    Menu,
    User
  } from 'lucide-svelte';

  let sidebarOpen = false;

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Beneficiaries', href: '/beneficiaries', icon: Users },
    { name: 'Claims', href: '/claims', icon: FileText },
    { name: 'Providers', href: '/providers', icon: Building2 },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  $: currentPath = $page.url.pathname;
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Mobile sidebar -->
  {#if sidebarOpen}
    <div class="fixed inset-0 z-50 lg:hidden">
      <div class="fixed inset-0 bg-gray-900/80" on:click={() => sidebarOpen = false}></div>
      <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Building2 class="h-5 w-5 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900">InsuranceOS</span>
          </div>
          <button on:click={() => sidebarOpen = false} class="text-gray-500 hover:text-gray-700">
            <Menu class="h-6 w-6" />
          </button>
        </div>
        <nav class="mt-8">
          <ul class="space-y-2">
            {#each navigation as item}
              <li>
                <a
                  href={item.href}
                  class="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    {currentPath === item.href 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'}"
                >
                  <svelte:component this={item.icon} class="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
    </div>
  {/if}

  <!-- Desktop sidebar -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:bg-white lg:px-6 lg:py-4">
    <div class="flex items-center space-x-2">
      <div class="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
        <Building2 class="h-5 w-5 text-white" />
      </div>
      <span class="text-xl font-bold text-gray-900">InsuranceOS</span>
    </div>
    <nav class="mt-8">
      <ul class="space-y-2">
        {#each navigation as item}
          <li>
            <a
              href={item.href}
              class="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                {currentPath === item.href 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'}"
            >
              <svelte:component this={item.icon} class="h-5 w-5" />
              <span>{item.name}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>

  <!-- Main content -->
  <div class="lg:pl-64">
    <!-- Top navigation -->
    <div class="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <button
              on:click={() => sidebarOpen = true}
              class="text-gray-500 hover:text-gray-700 lg:hidden"
            >
              <Menu class="h-6 w-6" />
            </button>
            <div class="ml-4 flex items-center lg:ml-0">
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:w-64"
                />
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <Bell class="h-6 w-6" />
              <span class="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-red-400 text-xs text-white flex items-center justify-center">3</span>
            </button>
            <div class="relative">
              <button class="flex items-center space-x-2 rounded-full bg-white p-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User class="h-5 w-5 text-gray-600" />
                </div>
                <span class="hidden md:block text-gray-700 font-medium">Admin User</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Page content -->
    <main class="py-8">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</div>