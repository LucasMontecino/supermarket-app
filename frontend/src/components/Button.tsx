export default function Button({ label }: { label: string }) {
  return (
    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition-colors cursor-pointer">
      {label}
    </button>
  );
}
