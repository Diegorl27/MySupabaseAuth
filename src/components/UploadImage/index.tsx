// components/UploadImage.tsx
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import useAuth from '@/store/useAuth';
import { toast } from 'sonner';
import { FaPlus } from 'react-icons/fa';

const UploadImage = ({ loading, setLoading }: { loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { user } = useAuth();
  const [inputKey, setInputKey] = useState(Date.now());

  const uploadImage = async (image: any) => {
    if (image) {
      await handleImageUpload(image);
      setInputKey(Date.now());
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const selectedImage = e.target.files[0];
    uploadImage(selectedImage);
  };

  const handleImageUpload = async (selectedImage: File) => {
    if (!user || !selectedImage) {
      toast.error('Please select an image to upload.');
      return;
    }

    setLoading(true);

    const fileExt = selectedImage.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, selectedImage);

    if (uploadError) {
      toast.error('Error uploading image!');
      return;
    }

    const { data } = supabase
      .storage
      .from('images')
      .getPublicUrl(filePath);

    const publicURL = data.publicUrl;

    const { error } = await supabase
      .from('images')
      .insert([{ user_id: user.id, image_url: publicURL }]);

    if (error) {
      toast.error('Error saving image URL!');
    } else {
      toast.success('Image uploaded successfully!');
      setLoading(false); // Clear the selected image after upload
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center border-2 border-pink-500 rounded-lg cursor-pointer hover:bg-pink-100 min-h-[300px] ${loading && 'bg-slate-200 border-2 border-slate-200'}`}>
      <input
        key={inputKey}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
        disabled={loading}
      />
      <label htmlFor="image-upload" className="flex items-center justify-center w-full h-full">
        <FaPlus className={`text-pink-500 ${loading && 'text-slate-600'}`} size="24" />
      </label>
    </div>
  );
};

export default UploadImage;
