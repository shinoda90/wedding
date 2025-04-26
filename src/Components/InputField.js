export default function InputField({ title, type, placeholder, value, onChange, field, required }) {
  return (
    <div className="gap-2 lg:gap-6">
      <div className="font-medium">{title}</div>
      <input
        type={type}
        className="input input-bordered w-full"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        required={required}
      />
    </div>
  );
}
