import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";
const RootLoading = () => (
  <div className="flex items-center justify-center w-full h-[calc(100vh-90px)]">
    <SlickSpinner strokeWidth={7} color="black" size={50} />
  </div>
);

export default RootLoading;
