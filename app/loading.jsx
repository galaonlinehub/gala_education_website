import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";
const RootLoading = () => (
  <div className="flex items-center justify-center w-full h-[calc(100vh-90px)]">
    <SlickSpinner strokeWidth={6} color="#001840" size={50} />
  </div>
);

export default RootLoading;
