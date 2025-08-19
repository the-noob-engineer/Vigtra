<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';

  Chart.register(...registerables);

  let chartCanvas: HTMLCanvasElement;
  let chart: Chart;

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Approved',
        data: [120, 150, 180, 140, 200, 160],
        backgroundColor: 'rgb(34, 197, 94)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: 'Pending',
        data: [30, 45, 35, 50, 40, 55],
        backgroundColor: 'rgb(251, 191, 36)',
        borderColor: 'rgb(251, 191, 36)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: 'Rejected',
        data: [15, 20, 25, 18, 30, 22],
        backgroundColor: 'rgb(239, 68, 68)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgb(243, 244, 246)'
        }
      },
      x: {
        grid: {
          color: 'rgb(243, 244, 246)'
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6
      }
    }
  };

  onMount(() => {
    const ctx = chartCanvas.getContext('2d');
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'line',
        data,
        options
      });
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  });
</script>

<div class="h-80">
  <canvas bind:this={chartCanvas}></canvas>
</div>