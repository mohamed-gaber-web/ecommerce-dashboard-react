import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ICategory } from '@/types/category';
import { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-2xl shadow">
      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Category Name" />
      <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug" />
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}
