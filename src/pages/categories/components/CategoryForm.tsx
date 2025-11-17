import { useState } from 'react';
import type { ICategory } from '@/types/category';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  initialData?: ICategory;
  onSubmit: (data: ICategory) => void;
}

export default function CategoryForm({ initialData, onSubmit }: Props) {
  const [formData, setFormData] = useState<ICategory>(initialData || { name: '', slug: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 flex flex-row gap-4">
      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Category Name" />
      <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug" />
      <Button type="submit" className="w-xss bg-blue-500 text-white hover:bg-blue-600 font-semibold text-xs">Save</Button>
    </form>
  );
}
