import { CloseCircleFilled } from '@ant-design/icons';
import confetti from 'canvas-confetti';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function DonationSuccess({ setCloseSuccessModal }) {
    const [_showConfetti, setShowConfetti] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {

        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        document.body.appendChild(canvas);
        canvasRef.current = canvas;

        const myConfetti = confetti.create(canvas, {
            resize: false,
            useWorker: false,
        });

        const audio = new Audio('/applause.wav');
        audio.volume = 0.7;
        audio.preload = 'auto';


        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);

        const confettiTimer = setTimeout(() => {
            setShowConfetti(true);

            audio.play().catch(() => {
            });

            const randomInRange = (min, max) => Math.random() * (max - min) + min;
            const duration = 3000;
            const animationEnd = Date.now() + duration;

            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    clearInterval(interval);
                    return;
                }

                myConfetti({
                    particleCount: 50,
                    startVelocity: 30,
                    spread: 360,
                    ticks: 60,
                    origin: { x: randomInRange(0.1, 0.3), y: 0 },
                });

                myConfetti({
                    particleCount: 50,
                    startVelocity: 30,
                    spread: 360,
                    ticks: 60,
                    origin: { x: randomInRange(0.7, 0.9), y: 0 },
                });


                myConfetti({
                    particleCount: 100,
                    startVelocity: 30,
                    spread: 360,
                    ticks: 60,
                    origin: { x: 0.5, y: 0 },
                });

                myConfetti({
                    particleCount: 75,
                    angle: 60,
                    spread: 100,
                    origin: { x: 0, y: 0 },
                });

                myConfetti({
                    particleCount: 75,
                    angle: 120,
                    spread: 100,
                    origin: { x: 1, y: 0 },
                });
            }, 250);
        }, 500);

        const detailsTimer = setTimeout(() => {
            setShowDetails(true);
        }, 1000);

        // Cleanup
        return () => {
            clearTimeout(confettiTimer);
            clearTimeout(detailsTimer);
            window.removeEventListener('resize', handleResize);
            if (canvasRef.current && document.body.contains(canvasRef.current)) {
                document.body.removeChild(canvasRef.current);
            }
        };
    }, []);

    const donate = useTranslations('donate');
    const act = useTranslations('all_classes');

    return (
        <>
            <div className="rounded-3xl p-12 max-w-md w-full text-center relative">
                <div className="relative mb-8">

                    <div className="w-24 h-24 mx-auto relative">
                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping"></div>
                        <div className="absolute inset-2 bg-green-200 rounded-full animate-pulse"></div>

                        <div className="absolute inset-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg transform animate-bounce">
                            <svg
                                className="w-8 h-8 text-white animate-pulse"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{ animation: 'checkmark 0.8s ease-in-out 0.5s both' }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="mb-8 transform animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <h1 className="text-lg font-bold text-green-700 mb-3">
                        {donate('donation_success')}
                    </h1>
                    <p className="text-gray-600">
                        {donate('success_statement')}
                    </p>
                    <p className="text-gray-600 font-semibold mt-2">
                        {donate('thanks_for_contribution')}
                    </p>
                </div>

                <button onClick={() => setCloseSuccessModal(true)} className="w-full bg-gradient-to-r bg-[#001840] text-white py-2 rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                    <CloseCircleFilled />
                    <span>{act('close')}</span>
                </button>

                <div
                    className={`transition-all duration-500 transform ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                </div>

                <div className="absolute top-4 right-4 w-4 h-4 bg-green-300 rounded-full animate-ping"></div>
                <div className="absolute bottom-6 left-6 w-3 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-8 left-8 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="absolute top-20 left-20 text-green-400 animate-bounce" style={{ animationDelay: '2s' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </div>

            <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes checkmark {
          0% { stroke-dasharray: 0 24; }
          100% { stroke-dasharray: 24 24; }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
        </>
    );
}