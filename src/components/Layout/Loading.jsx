const Loading = () => {
  return (
    <section
      className="fixed inset-0 z-9999 grid h-screen w-screen place-items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.16),transparent_32%),linear-gradient(135deg,#f8f7ff_0%,#f4f1ff_100%)]"
      role="status"
      aria-live="polite"
      aria-label="Loading application"
    >
      <div className="flex w-[min(320px,calc(100vw-2rem))] flex-col items-center justify-center gap-5 rounded-3xl border border-violet-400/20 bg-white/80 px-9 py-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div
          className="relative grid h-20 w-20 place-items-center"
          aria-hidden="true"
        >
          <span className="absolute inset-0 animate-[spin_1.8s_linear_infinite] rounded-full border-2 border-transparent border-t-violet-600 border-r-violet-400/40" />
          <span className="absolute inset-3.5 animate-[spin_2.4s_linear_infinite] rounded-full border-2 border-transparent border-t-violet-300 border-b-violet-300/40 [animation-direction:reverse]" />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="m-0 text-[1.05rem] font-bold tracking-[-0.02em] text-slate-800">
            Preparing your workspace
          </h2>
          <p className="m-0 text-[0.95rem] text-slate-500">
            Setting up your dashboard experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Loading;
