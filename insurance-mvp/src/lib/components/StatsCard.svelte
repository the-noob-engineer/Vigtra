<script lang="ts">
  import { TrendingUp, TrendingDown } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';

  export let title: string;
  export let value: string;
  export let change: string;
  export let changeType: 'positive' | 'negative';
  export let icon: ComponentType;
  export let color: 'blue' | 'green' | 'purple' | 'orange';

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  const changeClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600'
  };
</script>

<div class="card">
  <div class="flex items-center">
    <div class="flex-shrink-0">
      <div class="h-12 w-12 rounded-lg {colorClasses[color]} flex items-center justify-center">
        <svelte:component this={icon} class="h-6 w-6 text-white" />
      </div>
    </div>
    <div class="ml-4 flex-1">
      <p class="text-sm font-medium text-gray-600">{title}</p>
      <div class="flex items-baseline">
        <p class="text-2xl font-semibold text-gray-900">{value}</p>
        <div class="ml-2 flex items-center text-sm {changeClasses[changeType]}">
          {#if changeType === 'positive'}
            <TrendingUp class="h-4 w-4 mr-1" />
          {:else}
            <TrendingDown class="h-4 w-4 mr-1" />
          {/if}
          <span>{change}</span>
        </div>
      </div>
    </div>
  </div>
</div>