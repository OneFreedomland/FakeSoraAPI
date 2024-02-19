'use client'
import {useEffect, useRef, useState} from 'react'
import {GlobeAltIcon} from '@heroicons/react/24/outline'
import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import Link from "next/link";
import {languages} from "~/config";
import {useCommonContext} from '~/context/common-context'
import LoadingModal from "./LoadingModal";
import Image from "next/image";

export default function Header({
                                 locale = '',
                                 page = '',
                                 currentLanguageText = {
                                   loginText: 'Log in',
                                   loadingText: 'Loading'
                                 },
                               }) {
  const {showLoadingModal, setShowLoadingModal} = useCommonContext();

  const useCustomEffect = (effect, deps) => {
    const isInitialMount = useRef(true);
    useEffect(() => {
      if (process.env.NODE_ENV === 'production' || isInitialMount.current) {
        isInitialMount.current = false;
        return effect();
      }
    }, deps);
  };

  useCustomEffect(() => {

    return () => {
    }
  }, []);

  const checkLocalAndLoading = (lang) => {
    if (locale != lang) {
      setShowLoadingModal(true);
    }
  }

  return (
    <header className="sticky top-0 bg-[#020d24] z-20 w-full">
      <LoadingModal loadingText={currentLanguageText.loadingText}/>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-4 lg:px-0" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href={`/${locale}`} className="-m-1.5 p-1.5" onClick={() => setShowLoadingModal(true)}>
            <Image className="h-8 w-auto" src="/appicon.svg" alt="sorawebui.com" width={32} height={32}/>
          </a>
          <a href={`/${locale}`} className="-m-1.5 ml-0.5 p-1.5" onClick={() => setShowLoadingModal(true)}>
            <Image
              className="h-8 w-auto"
              src="/sorawebui.svg"
              width={32}
              height={24}
              alt="sorawebui.com"/>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-1">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                className="inline-flex w-full justify-center gap-x-1.5 border border-[rgba(255,255,255,0.5)] rounded-md px-3 py-2 text-sm font-semibold text-white hover:border-[rgba(255,255,255,0.9)]">
                <GlobeAltIcon className="w-5 h-5 text-white"/>{locale == 'default' ? 'EN': locale.toUpperCase()}
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true"/>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className="absolute right-0 z-10 mt-2 w-26 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {
                    languages.map((item) => {
                      let hrefValue = `/${item.lang}`;
                      return (
                        <Menu.Item key={item.lang}>
                          <Link href={hrefValue} onClick={() => checkLocalAndLoading(item.lang)}>
                              <span
                                className={'text-gray-700 block px-4 py-2 text-sm hover:text-[#2d6ae0]'}
                              >
                                {item.language}
                              </span>
                          </Link>
                        </Menu.Item>
                      )
                    })
                  }
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    </header>
  )
}