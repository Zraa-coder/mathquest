import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ShopItem, Profile } from '../types';
import { ShoppingBag, Check } from 'lucide-react';

export const ShopPage = ({ profile, onUpdateProfile }: { profile: Profile | null; onUpdateProfile: () => void }) => {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [inventory, setInventory] = useState<string[]>([]);

  useEffect(() => {
    const loadShop = async () => {
      const { data: iData } = await supabase.from('items').select('*');
      if (iData) setItems(iData);

      if (profile) {
        const { data: invData } = await supabase.from('inventory').select('item_id').eq('user_id', profile.id);
        if (invData) setInventory(invData.map(i => i.item_id));
      }
    };
    loadShop();
  }, [profile]);

  const handleBuy = async (item: ShopItem) => {
    if (!profile) return;
    try {
      await supabase.rpc('buy_shop_item', { user_uuid: profile.id, target_item_id: item.id });
      alert('🛍️ Mua thành công!');
      onUpdateProfile();
      setInventory([...inventory, item.id]);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi mua item');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-[#26354A] flex items-center gap-2"><ShoppingBag className="text-[#FF6FAE]"/> Cửa Hàng XP</h1>
        <div className="bg-[#DDF3FF] text-[#65B7FF] px-4 py-2 rounded-full font-bold">⭐ {profile?.xp || 0} XP</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(item => {
          const owned = inventory.includes(item.id);
          return (
            <div key={item.id} className="bg-white border border-pink-100 p-6 rounded-3xl flex flex-col justify-between space-y-4">
              <div>
                <div className="text-4xl text-center py-4 bg-pink-50 rounded-2xl mb-4">{item.image_url.length < 10 ? item.image_url : '🖼️'}</div>
                <h3 className="font-bold text-[#26354A] text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-extrabold text-[#FF6FAE]">⭐ {item.price} XP</span>
                <button
                  onClick={() => handleBuy(item)}
                  disabled={owned || (profile?.xp || 0) < item.price}
                  className={`px-4 py-2 rounded-xl font-bold text-sm ${
                    owned ? 'bg-gray-100 text-gray-400' : 'bg-[#FF6FAE] text-white hover:bg-pink-600'
                  }`}
                >
                  {owned ? <span className="flex items-center gap-1"><Check size={16}/> Đã sở hữu</span> : 'Đổi ngay'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

