import { HOW_TO_APPLY } from '@/lib/config';
import { ClipboardList, FileText, CheckCircle, ArrowRight } from 'lucide-react';

const stepIcons = [ClipboardList, FileText, CheckCircle];

export default function HowToApply() {
  return (
    <section id="apply" className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wide mb-2">
            How to Apply
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            Simple Application Process
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Three easy steps to secure your room.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {HOW_TO_APPLY.steps.map((step, i) => {
            const Icon = stepIcons[i] || FileText;
            return (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <div className="text-sm font-semibold text-accent mb-1">
                  Step {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Requirements */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What You&apos;ll Need
          </h3>
          <ul className="space-y-3">
            {HOW_TO_APPLY.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/apply"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 rounded-lg text-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Start Your Application
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
