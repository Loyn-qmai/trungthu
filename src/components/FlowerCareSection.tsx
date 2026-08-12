import React from 'react';
import { ShieldCheck, ThermometerSnowflake, SunMedium, PackageCheck } from 'lucide-react';

interface FlowerCareSectionProps {
  isDark?: boolean;
}

export const FlowerCareSection: React.FC<FlowerCareSectionProps> = ({ isDark = false }) => {
  const iconColorClass = isDark ? "w-6 h-6 text-amber-300" : "w-6 h-6 text-amber-700";

  const storageTips = [
    {
      icon: <SunMedium className={iconColorClass} />,
      title: 'Bảo quản nơi khô ráo & thoáng mát',
      desc: 'Giữ bánh chưa mở bao bì ở nhiệt độ phòng (20 - 25°C), tránh môi trường ẩm ướt, nguồn nhiệt cao và ánh nắng mặt trời chiếu trực tiếp.',
    },
    {
      icon: <ThermometerSnowflake className={iconColorClass} />,
      title: 'Bảo quản tủ lạnh sau khi cắt dở',
      desc: 'Khi cắt bánh dùng chưa hết, nên dùng màng bọc thực phẩm bọc kín hoặc cho vào hộp đậy nắp, cất ngăn mát tủ lạnh và dùng trong 3 - 5 ngày.',
    },
    {
      icon: <PackageCheck className={iconColorClass} />,
      title: 'Hạn sử dụng Bánh Nướng & Bánh Dẻo',
      desc: 'Bánh nướng có hạn sử dụng 30 - 45 ngày; Bánh dẻo nên dùng tốt nhất trong vòng 15 - 20 ngày để vỏ bánh không bị khô cứng.',
    },
    {
      icon: <ShieldCheck className={iconColorClass} />,
      title: 'Lưu ý gói hút ẩm & Bao bì',
      desc: 'Giữ nguyên gói hút ẩm bên trong khay bánh. Nếu phát hiện túi bao bì bị rách hoặc lọt không khí, nên dùng ngay hoặc bảo quản ngăn mát.',
    },
  ];

  return (
    <section className={`py-16 backdrop-blur-md transition-colors ${
      isDark
        ? 'bg-slate-900/80 border-y border-amber-500/30'
        : 'bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 border-y border-amber-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className={`text-xs font-bold uppercase tracking-widest inline-block mb-2 px-3 py-1 rounded-full border ${
            isDark
              ? 'text-amber-300 bg-amber-500/20 border-amber-400/30'
              : 'text-amber-800 bg-amber-100 border-amber-200'
          }`}>
            CẨM NANG BẢO QUẢN
          </span>
          <h2 className={`font-serif text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-amber-100' : 'text-stone-900'
          }`}>
            Hướng Dẫn Bảo Quản Bánh Trung Thu
          </h2>
          <p className={`mt-2 text-sm sm:text-base font-medium ${
            isDark ? 'text-amber-200/80' : 'text-stone-600'
          }`}>
            Phương pháp lưu giữ độ tươi ngon, vỏ bánh mềm dẻo và hương vị chuẩn vị cao cấp trong suốt mùa Đêm Rằm.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {storageTips.map((tip, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-slate-950/80 border-amber-500/30 shadow-lg hover:shadow-amber-500/10'
                  : 'bg-white border-amber-200/80 shadow-xs hover:shadow-md'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${
                  isDark
                    ? 'bg-amber-500/20 border-amber-400/30'
                    : 'bg-amber-100 border-amber-200'
                }`}>
                  {tip.icon}
                </div>
                <h3 className={`font-serif font-bold text-base mb-2 ${
                  isDark ? 'text-amber-100' : 'text-stone-900'
                }`}>{tip.title}</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-amber-200/70' : 'text-stone-600'
                }`}>{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


