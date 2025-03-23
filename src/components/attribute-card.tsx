type Attribute = {
  name: string;
  value: string;
};

export default function AttributeCard({ attribute }: { attribute: Attribute }) {
  return (
    <div className="flex items-center justify-between bg-[#9FD8F6] shadow-custom p-4 rounded-md">
      <p>{attribute.name}</p>
      <p className="font-bold">{attribute.value}</p>
    </div>
  );
}