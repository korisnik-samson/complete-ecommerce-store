"use client";

// Global Imports
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Local Imports
import Button from '@/components/ui/Button';
import Currency from '@/components/ui/Currency';
import useCart from '@/hooks/use-cart';

const Summary = () => {
  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:pt-8'>
      <h2 className='text-lg font-medium text-gray-900'>
        Order Summary
      </h2>
    </div>
  )
}

export default Summary