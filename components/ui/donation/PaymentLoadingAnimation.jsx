import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function PaymentLoadingAnimation() {
    const [_progress, setProgress] = useState(0);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0;
                return prev + Math.random() * 15;
            });
        }, 300);

        return () => {
            clearInterval(progressInterval);
        };
    }, []);

    const donate = useTranslations('donate');

    return (

        <div className="p-12 max-w-md w-full text-center relative">

            {/* Smartphone Icon */}
            <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto relative">
                    <div className="w-full h-full bg-[#001840] rounded-2xl animate-pulse shadow-lg flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2H8a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2zM12 18h.01" />
                        </svg>
                    </div>


                    {/* Checkmark Animation */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#001840] rounded-full flex items-center justify-center animate-bounce">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Text */}
            <h2 className="text-lg font-bold text-[#001840] mb-2">
                {donate('processing_payment')}
            </h2>

            <p className="text-[#334155] mb-8">
                {donate('processing_statement')}
            </p>




            {/* Dot Loader with Enhanced Bounce */}
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-[#003366] rounded-full animate-bounce [animation-delay:-0.4s] [animation-duration:0.8s]"></div>
                <div className="w-2 h-2 bg-[#003366] rounded-full animate-bounce [animation-delay:-0.2s] [animation-duration:0.8s]"></div>
                <div className="w-2 h-2 bg-[#003366] rounded-full animate-bounce [animation-duration:0.8s]"></div>
            </div>

            <p className="text-red-500 font-semibold text-xs mb-8">
                {donate('dont_leave_this_page')}
            </p>


            {/* Decorative Pings */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-[#001840]/20 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 bg-[#001840]/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>

    );
}
