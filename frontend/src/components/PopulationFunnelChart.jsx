import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const PopulationFunnelChart = () => {

  const [populations, setPopulations] = useState([])
  // Calling Backend API to get Population data
  useEffect(()=>{
     async function getAllPopulation() {
        try {
            const backendAPIBaseURL = process.env.REACT_APP_Backend_API_Base_URL
            const populations = await axios.get(`${backendAPIBaseURL}/population/`);
            const populationDesc = [...populations.data].sort((a, b) => b.id - a.id);
            setPopulations(populationDesc);
        } catch(error) {
            console.log(error)
        }
    }
    getAllPopulation()
  }, [])


//   const malePopulation = [16977, 147792, 626847, 1494421, 2721048, 4475564, 6881732, 8634739, 10223302, 10759761, 10176612, 9920816, 10028183, 10857087, 11241831, 11229510, 11265350, 11241567, 11066169, 10288218, 9388285];
//   const femalePopulation = [63162, 403034, 1249444, 2334758, 3667731, 5479758, 7941506, 9653988, 11064617, 11360728, 10546900, 10224478, 10281010, 11017857, 11291581, 11071744, 10900849, 10794509, 10561661, 9842205, 9011950];
//   const categories = ['100+', '95-99', '90-94', '85-89', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54', '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9', '0-4']; 
  
  const malePopulation = populations.map(item => item.male_population);
  const femalePopulation = populations.map(item => item.female_population);
  const categories = populations.map(item => item.age_range);

  // Total population of males and females
  const totalMalePopulation = malePopulation.reduce((acc, val) => acc + val, 0);
  const totalFemalePopulation = femalePopulation.reduce((acc, val) => acc + val, 0);

  // Total population
  const totalPopulation = totalMalePopulation + totalFemalePopulation;

  // Calculate percentage of each age category for males and females
  const malePercentage = malePopulation.map(value => (-(value / totalPopulation) * 100).toFixed(2));
  const femalePercentage = femalePopulation.map(value => ((value / totalPopulation) * 100).toFixed(2));

  // Min Max Percentage Value
  const minPercentage = Math.min(...malePercentage);
  const maxPercentage = Math.max(...femalePercentage);


  const options = {
    chart: {
      type: 'bar',
      height: 440,
      stacked: true
    },
    colors: ['#599cd3', '#e87e32'],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '100%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1,
      colors: ["#000"]
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    yaxis: {
      min: minPercentage-.5,
      max: maxPercentage+.5 ,
      title: {
        text: "Years",
        style: {
            color:  '#919191',
          }
    },
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return val
        }
      },
      y: {
        formatter: function (val, { seriesIndex, dataPointIndex, w }) {
          const population = seriesIndex === 0 ? malePopulation[dataPointIndex] : femalePopulation[dataPointIndex];
          return `${Math.abs(val)}% (Population: ${population})`;
        }
      }
    },
    title: {
      text: 'United States Population (2020)',
      align: 'centre',
      style: {
        color:  '#919191',
        fontSize: '18px'
      }
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'Percentage of Population',
        style: {
            color:  '#919191',
          }
      },
      labels: {
        formatter: function (val) {
          return Math.abs(Math.round(val)) + "%"
        }
      }
    },
  };

  const series = [
  {
    name: 'Males',
    data: malePercentage
  },
  {
    name: 'Females',
    data: femalePercentage
  }];



  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={500} />
      </div>
    </div>
  );
};

export default PopulationFunnelChart;