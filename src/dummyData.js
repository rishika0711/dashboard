const dummyData = [
  {
    category: 'CSPM Executive Dashboard',
    widgets: [
      {
        id: 1,
        name: 'Cloud Accounts',
        type: 'circle',
        data: {
          labels: ['Connected (2)', 'Not Connected(0)'],
          datasets: [{
            data: [50, 50],
            backgroundColor: ['#1890FF', '#FF6384'],
            hoverBackgroundColor: ['#1890FF', '#FF6384']
          }],
        },
      },
      {
        id: 2,
        name: 'Cloud Account Risk Assessment',
        type: 'dashboard',
        data: {
          labels: ['Failed (1689)', 'Warning (681)', 'Not available (89)', 'Passed (7253)'],
          datasets: [{
            data: [17, 6.81, 0.36, 72.53],
            backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB', '#4BC0C0']
          }],
        },
      },
    ],
  },
  {
    category: 'CWPP Dashboard',
    widgets: [
      {
        id: 1,
        name: 'Top 5 Namespace Specific Alerts',
        type: 'empty',
        data: [],
      },
      {
        id: 2,
        name: 'Workload Alerts',
        type: 'empty',
        data: [],
      }
    ],
  },
  {
    category: 'Registry Scan',
    widgets: [
      {
        id: 3,
        name: 'Image Risk Assessment',
        text: 'Critical (9)\nHigh (150)',
        type: 'line',
        label: '1470 Total Vulnerabilities',
        percent: 99,
        data: {
          labels: ['high (2)', 'critical(2)'],
        },
      },
      {
        id: 4,
        name: 'Image Security Issues',
        text: 'Critical (2)\nHigh (2)',
        type: 'line',
        percent: 99,
        label: '2 Total Images',
        data: {
          labels: ['high (2)', 'critical(2)'],
        },
      },
    ],
  },
];

export default dummyData;
