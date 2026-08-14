export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="animate-blob absolute -top-40 left-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div
        className="animate-blob absolute top-[30%] right-[5%] h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="animate-blob absolute bottom-[-10%] left-[25%] h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px]"
        style={{ animationDelay: '-12s' }}
      />
      <div className="noise absolute inset-0 opacity-40" />
    </div>
  );
}
