import { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckIcon, XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Loader from './Loader';

const PricingTable = ({ darkMode, className }) => {
  const [selectedCycle, setSelectedCycle] = useState('monthly');
  const [loading, setLoading] = useState(false);
  
  const tiers = [
    {
      name: 'Starter',
      price: {
        monthly: '49',
        annually: '529'
      },
      features: [
        { name: 'API Requests', value: '10K/month' },
        { name: 'Models Access', value: 'Basic Models' },
        { name: 'Support', value: 'Community Forum' },
        { name: 'Custom Models', value: false },
        { name: 'Priority Support', value: false },
        { name: 'SLA', value: false }
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Pro',
      price: {
        monthly: '199',
        annually: '2149'
      },
      features: [
        { name: 'API Requests', value: '100K/month' },
        { name: 'Models Access', value: 'Advanced Models' },
        { name: 'Support', value: '24h Response' },
        { name: 'Custom Models', value: true },
        { name: 'Priority Support', value: true },
        { name: 'SLA', value: '99.9%' }
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      price: {
        monthly: 'Custom',
        annually: 'Custom'
      },
      features: [
        { name: 'API Requests', value: 'Unlimited' },
        { name: 'Models Access', value: 'Full Suite' },
        { name: 'Support', value: '24/7 Dedicated' },
        { name: 'Custom Models', value: true },
        { name: 'Priority Support', value: true },
        { name: 'SLA', value: '99.99%' }
      ],
      cta: 'Contact Sales'
    }
  ];

  const features = [
    'API Requests',
    'Models Access',
    'Support',
    'Custom Models',
    'Priority Support',
    'SLA'
  ];

  const toggleCycle = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setSelectedCycle(prev => (prev === 'monthly' ? 'annually' : 'monthly'));
    setLoading(false);
  };

  const calculateSavings = (monthly, annually) => {
    const monthlyTotal = parseFloat(monthly) * 12;
    const annualTotal = parseFloat(annually);
    return Math.round(((monthlyTotal - annualTotal) / monthlyTotal) * 100);
  };

  return (
    <div className={`${className} ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Billed monthly
            </span>
            <button
              onClick={toggleCycle}
              disabled={loading}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600 transition-colors focus:outline-none"
            >
              <span className="sr-only">Toggle billing cycle</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  selectedCycle === 'annually' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="relative">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Billed annually
              </span>
              {loading && (
                <div className="absolute -right-6 top-0">
                  <Loader size="sm" type="spinner" />
                </div>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 ${
                  tier.popular 
                    ? 'bg-purple-600 text-white shadow-2xl' 
                    : darkMode 
                      ? 'bg-gray-700' 
                      : 'bg-gray-50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-white text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
                    Most popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-4 ${tier.popular ? 'text-white' : ''}`}>
                  {tier.name}
                </h3>
                <div className="mb-8">
                  <span className="text-4xl font-bold">
                    {tier.price[selectedCycle] === 'Custom' ? tier.price[selectedCycle] : `$${tier.price[selectedCycle]}`}
                  </span>
                  <span className={`text-lg ${tier.popular ? 'text-purple-100' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tier.price[selectedCycle] !== 'Custom' && `/ ${selectedCycle === 'monthly' ? 'month' : 'year'}`}
                  </span>
                  {selectedCycle === 'annually' && tier.price.monthly !== 'Custom' && (
                    <div className={`text-sm mt-2 ${tier.popular ? 'text-purple-200' : 'text-green-600'}`}>
                      Save {calculateSavings(tier.price.monthly, tier.price.annually)}%
                    </div>
                  )}
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    tier.popular
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : darkMode
                        ? 'bg-gray-600 hover:bg-gray-500 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {tier.cta}
                </button>
                <div className="mt-8 space-y-4">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckIcon className={`w-5 h-5 ${
                        tier.popular ? 'text-white' : 'text-green-500'
                      }`} />
                      <span>{feature.value === true ? feature.name : feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-4 font-medium pr-8">Feature</th>
                  {tiers.map((tier) => (
                    <th key={tier.name} className="text-center py-4 px-8 font-medium">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? darkMode ? 'bg-gray-900/20' : 'bg-gray-50' : ''}`}>
                    <td className="py-4 pr-8">{feature}</td>
                    {tiers.map((tier) => {
                      const tierFeature = tier.features.find(f => f.name === feature);
                      return (
                        <td key={tier.name} className="text-center py-4 px-8">
                          {typeof tierFeature?.value === 'boolean' ? (
                            tierFeature.value ? (
                              <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XMarkIcon className="w-5 h-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className={darkMode ? 'text-gray-300' : ''}>
                              {tierFeature?.value}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Note */}
          <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-green-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                30-day money-back guarantee • Enterprise-grade security
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PricingTable.propTypes = {
  darkMode: PropTypes.bool,
  className: PropTypes.string
};

export default PricingTable;