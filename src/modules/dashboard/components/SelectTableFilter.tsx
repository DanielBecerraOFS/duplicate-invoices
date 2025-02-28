import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectTableFilterProps {
  placeholder: string;
  label: string;
  options: string[];
}

const SelectTableFilter: React.FC<SelectTableFilterProps> = ({ placeholder, label, options }) => {
  return (
    <Select>
      <SelectTrigger className="w-[250px] border-amber-300 ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {
            options.map((item) => {
              return <SelectItem value={item}>{item}</SelectItem>
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectTableFilter;
