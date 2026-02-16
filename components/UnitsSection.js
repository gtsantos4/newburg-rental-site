import { UNITS_DATA } from '@/lib/config';
import UnitCard from './UnitCard';

export default function UnitsSection() {
  return (
    <section id="units" className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wide mb-2">
            Available Units
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            Find Your Perfect Room
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Each room is fully furnished and includes all utilities. Just bring your suitcase.
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNITS_DATA.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      </div>
    </section>
  );
}
