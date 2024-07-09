import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <select
      value={locale}
      onChange={changeLanguage}
      className="px-4 py-2 border border-gray-300 text-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
};

export default LanguageSwitcher;
