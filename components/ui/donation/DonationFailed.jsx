import { CloseCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function PaymentFailedAnimation({ setCloseFailureModal }) {
    const [showDetails, setShowDetails] = useState(false);
    const [shake, setShake] = useState(false);


    useEffect(() => {

        const shakeTimer = setTimeout(() => {
            setShake(true);
        }, 200);

        const detailsTimer = setTimeout(() => {
            setShowDetails(true);
        }, 800);

        return () => {
            clearTimeout(shakeTimer);
            clearTimeout(detailsTimer);
        };
    }, []);

    const payt = useTranslations('payments')

    return (
        <div>

            {/* Main Failed Card */}
            <div className={` backdrop-blur-xl rounded-3xl p-12 max-w-md w-full text-center relative transition-all duration-300 ${shake ? 'animate-shake' : ''}`}>

                {/* Failed Icon */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto relative">
                        {/* Outer Circle Animation */}
                        <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-60"></div>
                        <div className="absolute inset-2 bg-red-200 rounded-full animate-pulse"></div>

                        {/* Main Failed Circle */}
                        <div className="absolute inset-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{ animation: 'fadeIn 0.8s ease-in-out 0.3s both' }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>

                        {/* Warning Triangle */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Failed Message */}
                <div className="mb-8 transform animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <h1 className="text-lg font-bold text-red-700 mb-3">
                        {payt('payment_failed')}
                    </h1>
                    <p className="text-gray-600 mb-4">
                        {payt('payment_processing_error')}
                    </p>
                    <p className="text-xs text-gray-500">
                        {payt('no_charges_made')}
                    </p>
                </div>
                <div
                    className={`transition-all duration-500 transform ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    <div className="space-y-3">
                        <button onClick={() => setCloseFailureModal(true)} className="w-full bg-gradient-to-r bg-[#001840] text-white py-2 rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                            <CloseCircleFilled />
                            <span>{payt('close')}</span>
                        </button>


                        <button
                            onClick={() => window.location.href = 'mailto:support@galahub.tz?subject=Payment Support Needed'}
                            className="w-full bg-white border-2 border-gray-200 text-gray-600 py-2 rounded-2xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <QuestionCircleFilled />
                            <span>{payt('contact_support')}</span>
                        </button>
                    </div>
                </div>

                <div className="absolute top-4 right-4 w-3 h-3 bg-red-300 rounded-full animate-ping"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-8 left-8 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="absolute top-20 left-20 text-red-400 animate-bounce" style={{ animationDelay: '2s' }}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
            </div>

            <div className="absolute bottom-32 right-16 text-orange-400 animate-pulse" style={{ animationDelay: '2.5s' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
        </div>
    );
}