export default function Title({ title }: { title: string }) {
  return (
    <h1 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg">
      {title}
    </h1>
  );
}
