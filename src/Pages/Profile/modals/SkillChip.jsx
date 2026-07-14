import { X } from "lucide-react";

const SkillChip = ({ skill, onRemove }) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
      <span>{skill}</span>

      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-1 transition hover:bg-violet-100"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default SkillChip;
