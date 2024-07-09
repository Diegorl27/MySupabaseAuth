/* eslint-disable @next/next/no-img-element */
// components/ImageGallery.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import useAuth from '@/store/useAuth';
import { FaTrash } from 'react-icons/fa';
import { Image } from '@/types/image.interfaces';
import UploadImage from '../UploadImage';
import { useTranslation } from 'react-i18next';
import { BsEye } from 'react-icons/bs';

const ImageGallery: React.FC = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error(error);
        } else {
          setImages(data as Image[]);
        }
      }
    };

    fetchImages();
  }, [user, loading]);

  const handleImageDelete = async (image_id: number) => {
    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', image_id);

    if (error) {
      console.error(error);
    } else {
      setImages(images.filter((image) => image.id !== image_id));
    }
  };

  return (
    <div className="flex flex-col h-[100vh]">
      <h1 className="text-3xl font-bold mb-10">{t('Pictures')}</h1>
      <div className='flex w-full'>
        <div className="w-full">
          <div className='grid grid-cols-3 gap-5 overflow-y-auto p-4'>
            <UploadImage loading={loading} setLoading={setLoading} />
            {images.map((image) => (
              <div
                key={image.id}
                className={`relative h-max cursor-pointer border-2 ${selectedImage?.id === image.id ? 'border-pink-500 rounded-lg' : 'border-transparent'}`}
              >
                <img src={image.image_url} alt="User Image" className="w-full object-cover rounded-lg" />
                <div className='flex items-center justify-center absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-0 opacity-0 hover:bg-opacity-60 hover:opacity-100 transition-opacity'>
                  <div className="flex gap-3">
                    <FaTrash
                      size={30}
                      className={`text-white bg-black bg-opacity-50 p-1 rounded cursor-pointer hover:text-pink-500`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageDelete(image.id);
                      }}
                    />
                    <BsEye
                      size={30}
                      className={`text-white bg-black bg-opacity-50 p-1 rounded cursor-pointer hover:text-pink-500`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedImage && (
          <div className="w-1/3 px-5 h-full bg-gray-200 rounded-lg shadow-xl">
            <div className="h-full flex flex-col overflow-y-auto text-center mt-4">
              <h3 className="text-2xl font-bold">Preview 1:1</h3>
              <img src={selectedImage.image_url} alt="Selected Image" className="w-[100%] h-auto mb-4 border border-gray-300 rounded-md" />
              <h3 className="text-2xl font-bold">Preview 16:9</h3>
              <img src={selectedImage.image_url} alt="Selected Image" className="w-[100%] h-auto mb-4 border border-gray-300 rounded-md" style={{ aspectRatio: '16/9' }} />
              <h3 className="text-2xl font-bold">Preview 9:16</h3>
              <img src={selectedImage.image_url} alt="Selected Image" className="w-[100%] h-auto mb-4 border border-gray-300 rounded-md" style={{ aspectRatio: '9/16' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
