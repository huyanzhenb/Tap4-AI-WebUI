'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

import BaseImage from '../image/BaseImage';
import LocaleSwitcher from '../LocaleSwitcher';
import MenuBtn from './MenuBtn';
import NavigationDrawer from './NavigationDrawer';
import SubmitForm from '@/app/[locale]/(with-footer)/submit/SubmitForm';

const Modal: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => (  
  <div className={cn('modal-overlay', { hidden: !isVisible })}>  
    <div className="modal" style={{  
      // 这里添加内联样式来控制模态框的显示层级和位置  
      position: 'fixed', // 使模态框固定在页面上  
      top: 0,  
      left: 0,  
      width: '100%', // 宽度占满整个屏幕  
      height: '100%', // 高度占满整个屏幕  
      display: isVisible ? 'flex' : 'none', // 根据 isVisible 控制显示或隐藏  
      alignItems: 'center', // 垂直居中  
      justifyContent: 'center', // 水平居中  
      zIndex: 1000, // 确保模态框在顶层  
      // 还可以添加背景色、透明度等样式  
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明黑色背景  
    }} >  
    <SubmitForm />
      <button onClick={onClose} className="bg-black text-white  flex items-center justify-center cursor-pointer focus:outline-none">关闭</button>  
    </div>  
  </div>  
); 

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const NavLinks = NAV_LINKS.map((item) => ({
    ...item,
    label: t(`${item.code}`),
  }));
  const [modalVisible, setModalVisible] = useState(false); // 新增状态来控制弹窗的显示
  // 假设每个按钮点击时都显示相同的弹窗  
  const handleButtonClick = (code: string) => {    
    if (code === '提交产品') {    
      // 执行提交产品的逻辑，比如调用API等  
      setModalVisible(true);  
      // 注意：这里可能不需要打开模态框  
    }  
  };  
  
  // 弹窗关闭处理函数  
  const handleModalClose = () => {  
    setModalVisible(false);  
  };  

  return (
    <>
      <header className='bg-frosted-glass sticky left-0 top-0 z-50 flex h-[64px] bg-black px-5 blur-[60%] filter lg:px-0'>
        <nav className='mx-auto flex max-w-pc flex-1 items-center bg-black'>
          <div>
            <Link className='hover:opacity-80' href='/' title={t('title')}>
              <BaseImage
                src='/images/dicloak.svg'
                alt={t('title')}
                title={t('title')}
                width={64}
                height={64}
                className='size-[100px] lg:size-40'
              />
            </Link>
          </div>
          {/* pc */}
          <div className='ml-auto flex h-full items-center gap-x-[46px]'>
            <ul className='hidden h-full flex-1 capitalize lg:flex lg:gap-x-12'>
              {NavLinks.map((item) => (
                <button  
                key={item.code}
                type="button"  
                title={item.code}  
                onClick={() =>   handleButtonClick(item.code)
                  // 执行你的逻辑  
                }  
                className={cn(  
                  'flex h-full items-center text-white hover:text-white/40',  
                  // 你的其他条件样式  
                )}  
              >  
                <span>{item.code}</span>  
              </button>
              ))}
            </ul>
            <div className='flex items-center gap-x-3'>
              <LocaleSwitcher />
            </div>
            <div>111</div>
          </div>
          {/* mobile */}
          <div className='mx-3 flex items-center gap-x-4 lg:hidden'>
            <MenuBtn open={open} onClick={() => setOpen(!open)} />
          </div>
        </nav>
      </header>
      <NavigationDrawer open={open} setOpen={setOpen} />
      <Modal isVisible={modalVisible} onClose={handleModalClose} />
    </>
  );
}
