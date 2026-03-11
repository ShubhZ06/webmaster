import { Leaf, Droplets, ThermometerSun, Wind, Factory, Car, Zap, Recycle, TreePine, Flame, AlertTriangle, Activity } from 'lucide-react';

export const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Impact', href: '#impact' },
  { name: 'Causes', href: '#causes' },
  { name: 'In India', href: '#india' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Facts', href: '#facts' },
];

export const impactStats = [
  {
    id: 1,
    title: 'Global Temperature Rise',
    value: 1.1,
    suffix: '°C',
    description: 'Increase since pre-industrial times',
    icon: ThermometerSun,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    darkBgColor: 'dark:bg-red-950/30'
  },
  {
    id: 2,
    title: 'Sea Level Rise',
    value: 3.4,
    suffix: 'mm/yr',
    description: 'Average global sea level rise',
    icon: Droplets,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    darkBgColor: 'dark:bg-blue-950/30'
  },
  {
    id: 3,
    title: 'Carbon Dioxide Level',
    value: 421,
    suffix: 'ppm',
    description: 'Current atmospheric concentration',
    icon: Wind,
    color: 'text-slate-500',
    bgColor: 'bg-slate-50',
    darkBgColor: 'dark:bg-slate-900/50'
  },
  {
    id: 4,
    title: 'Ice Sheet Loss',
    value: 428,
    suffix: 'B tons',
    description: 'Annual ice mass loss',
    icon: Activity,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
    darkBgColor: 'dark:bg-cyan-950/30'
  }
];

export const climateCauses = [
  {
    id: 'cause-1',
    title: 'Fossil Fuels',
    description: 'Burning coal, oil and gas produces carbon dioxide and nitrous oxide.',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80',
    color: 'bg-slate-800'
  },
  {
    id: 'cause-2',
    title: 'Deforestation',
    description: 'Cutting down forests reduces nature\'s ability to absorb emissions.',
    icon: TreePine,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80',
    color: 'bg-emerald-600'
  },
  {
    id: 'cause-3',
    title: 'Agriculture',
    description: 'Livestock and fertilizers produce methane and nitrous oxide.',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
    color: 'bg-amber-600'
  },
  {
    id: 'cause-4',
    title: 'Transportation',
    description: 'Vehicles powered by fossil fuels remain a major emission source.',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80',
    color: 'bg-blue-600'
  },
  {
    id: 'cause-5',
    title: 'Energy Consumption',
    description: 'High energy use in buildings and industry drives up demand for fossil fuels.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80',
    color: 'bg-yellow-500'
  },
  {
    id: 'cause-6',
    title: 'Waste & Landfills',
    description: 'Decomposing waste in landfills produces significant amounts of methane.',
    icon: Trash2,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80',
    color: 'bg-stone-600'
  }
];

// Re-export Trash2 which wasn't in the initial import list above to avoid syntax issues if it was missed
import { Trash2 } from 'lucide-react';

export const indiaImpacts = [
  {
    id: 'in-1',
    region: 'Himalayas',
    title: 'Glacial Retreat',
    description: 'Accelerated melting threatens water security for millions downstream.',
    x: 40,
    y: 20
  },
  {
    id: 'in-2',
    region: 'Coastal Areas',
    title: 'Sea Level Rise',
    description: 'Major cities like Mumbai and Chennai face severe flooding risks.',
    x: 30,
    y: 70
  },
  {
    id: 'in-3',
    region: 'Central India',
    title: 'Extreme Heat',
    description: 'Increasing frequency of deadly heatwaves affecting agriculture and health.',
    x: 45,
    y: 50
  },
  {
    id: 'in-4',
    region: 'Northeast',
    title: 'Erratic Rainfall',
    description: 'Changing monsoon patterns leading to devastating floods and droughts.',
    x: 80,
    y: 40
  }
];

export const solutions = [
  {
    id: 'sol-1',
    title: 'Renewable Energy',
    description: 'Transitioning to solar, wind, and hydro power.',
    icon: Zap,
    action: 'Support clean energy'
  },
  {
    id: 'sol-2',
    title: 'Sustainable Transport',
    description: 'Using public transit, EVs, or active transport.',
    icon: Car,
    action: 'Reduce driving'
  },
  {
    id: 'sol-3',
    title: 'Plant-Rich Diet',
    description: 'Reducing meat consumption lowers agricultural emissions.',
    icon: Leaf,
    action: 'Eat plant-based'
  },
  {
    id: 'sol-4',
    title: 'Circular Economy',
    description: 'Reducing waste through recycling and upcycling.',
    icon: Recycle,
    action: 'Reduce & Reuse'
  }
];

export const climateFacts = [
  "The last decade was the hottest on record.",
  "Nature can provide up to 37% of the emission reductions needed by 2030.",
  "11% of all global greenhouse gas emissions caused by humans are due to deforestation.",
  "Oceans have absorbed about 30% of carbon dioxide produced by humans.",
  "Transitioning to a green economy could yield a direct economic gain of $26 trillion through 2030."
];

export const initialCalculatorData = {
  transport: 30,
  energy: 40,
  food: 20,
  goods: 10
};
