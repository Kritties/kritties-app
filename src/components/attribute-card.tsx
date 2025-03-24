type Attribute = {
  name: string;
  value: string;
};

type AttributeCard = {
  attribute: Attribute;
  isLoading?: boolean;
} | {
  attribute?: never;
  isLoading: true;
}
export default function AttributeCard({
  attribute,
  isLoading = false,
}: AttributeCard) {
  return (
    <div className="flex items-center justify-between bg-[#9FD8F6] shadow-custom p-4 rounded-md">
      {isLoading && (
        <>
          <div  className="skeleton w-[300px] h-[20px]"></div>
        </>
      )}

      {!isLoading && attribute && (
        <>
          <p>{attribute.name}</p>
          <p className="font-bold">{attribute.value}</p>
        </>
      )}
    </div>
  );
}
