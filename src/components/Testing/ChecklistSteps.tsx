import { CheckCircle, Circle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Step {
  label: string;
  completed: boolean;
  required?: boolean;
  route?: string;
}

interface ChecklistStepsProps {
  steps: Step[];
}

export default function ChecklistSteps({ steps }: ChecklistStepsProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-full p-4 bg-dark-secondary rounded-2xl shadow-md space-y-4">
      <div
        className="flex justify-between items-center cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-xl font-semibold text-white">Get Started</h2>
        <ChevronDown
          className={`w-5 h-5 text-white transition-transform duration-300 ${
            expanded ? 'rotate-0' : '-rotate-180'
          }`}
        />
      </div>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-3 pt-2">
          {steps.map((step, idx) => {
            const isClickable = !!step.route;
            return (
              <li
                key={idx}
                onClick={() => isClickable && navigate(step.route!)}
                className={`flex items-center gap-3 text-white p-3 rounded-lg transition 
                  ${isClickable ? 'hover:bg-dark-accent cursor-pointer' : ''}
                `}
              >
                {step.completed ? (
                  <CheckCircle className="text-green-400 w-5 h-5" />
                ) : (
                  <Circle className="text-gray-500 w-5 h-5" />
                )}
                <span className={`${step.required ? 'font-medium' : 'opacity-80'}`}>
                  <span className={isClickable ? 'underline underline-offset-2' : ''}>
                    {step.label}
                  </span>
                  {step.required && (
                    <span className="ml-1 text-xs text-red-400 no-underline">(required)</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
