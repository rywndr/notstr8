import { ChangeEvent } from 'react';

/**
 * Handles digit-only input by removing any non-digit characters.
 */
export const handleDigitInput = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/\D/g, ''); // Remove any non-digit characters
};

/**
 * Handles phone number input ensuring proper Indonesian mobile number format.
 * - Ensures number starts with 8
 * - Limits length to 12 digits
 * - Removes non-digit characters
 */
export const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
  // Remove non-digit characters
  let value = e.target.value.replace(/\D/g, '');
  
  // Ensure starts with 8
  if (value.length > 0 && value[0] !== '8') {
    value = value.substring(1);
    if (value.length > 0 && value[0] !== '8') {
      value = '8' + value.substring(1);
    } else if (value.length === 0) {
      value = '8';
    }
  }
  
  // 10-12 digits length
  if (value.length > 12) {
    value = value.substring(0, 12);
  }
  
  e.target.value = value;
};

/**
 * Handles Rupiah format with thousand separator.
 * Removes non-digits and formats with thousand separator.
 */
export const handleRupiahInput = (e: ChangeEvent<HTMLInputElement>) => {
  // Remove non-digits and convert to number
  const value = e.target.value.replace(/\D/g, '');
  
  // Format with thousand separator
  if (value) {
    e.target.value = new Intl.NumberFormat('id-ID').format(parseInt(value));
  } else {
    e.target.value = '';
  }
};

/**
 * Calculates age from date of birth
 * @param dateOfBirth Date of birth as string in YYYY-MM-DD format
 * @returns Age in years as number
 */
export const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  // If birthday hasn't happened yet this year, subtract one from age
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Calculates birth year from age
 * @param age Age in years
 * @returns Date of birth as string in YYYY-MM-DD format with month and day set to today's
 */
export const calculateBirthYear = (age: number): string => {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  
  // Set to same month and day as today
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  
  return `${birthYear}-${month}-${day}`;
};

/**
 * Handle date of birth change - automatically update age
 * @param e Change event from the date input
 * @param setDateOfBirth State setter function for date of birth
 * @param setAge State setter function for age
 */
export const handleDateOfBirthChange = (
  e: ChangeEvent<HTMLInputElement>,
  setDateOfBirth: (date: string) => void,
  setAge: (age: string) => void
): void => {
  const newDateOfBirth = e.target.value;
  setDateOfBirth(newDateOfBirth);
  
  if (newDateOfBirth) {
    const calculatedAge = calculateAge(newDateOfBirth);
    setAge(calculatedAge.toString());
    
    // Update the age field in the DOM
    const ageInput = document.getElementById('age') as HTMLInputElement;
    if (ageInput) {
      ageInput.value = calculatedAge.toString();
    }
  }
};

/**
 * Handle age change - automatically update date of birth year
 * @param e Change event from the age input
 * @param setAge State setter function for age
 * @param setDateOfBirth State setter function for date of birth
 */
export const handleAgeChange = (
  e: ChangeEvent<HTMLInputElement>,
  setAge: (age: string) => void,
  setDateOfBirth: (date: string) => void
): void => {
  // apply digit-only restriction
  handleDigitInput(e);
  
  const newAge = e.target.value;
  setAge(newAge);
  
  if (newAge && !isNaN(parseInt(newAge))) {
    const calculatedBirthDate = calculateBirthYear(parseInt(newAge));
    setDateOfBirth(calculatedBirthDate);
    
    // Update date of birth field in the DOM
    const dobInput = document.getElementById('dateOfBirth') as HTMLInputElement;
    if (dobInput) {
      dobInput.value = calculatedBirthDate;
    }
  }
};

export const formatDate = (date: Date | string | null, mounted: boolean = true): string => {
  if (!mounted || !date) return '-';
  return new Date(date).toLocaleDateString('id-ID');
};

export const formatDateTime = (date: Date | string | null, mounted: boolean = true): string => {
  if (!mounted || !date) return '';
  return new Date(date).toLocaleString('id-ID');
};

export const formatDisplayValue = (value: boolean | null): string => {
  return value === null ? '-' : value ? 'Ya' : 'Tidak';
};

export const getBadgeColor = (type: string, value?: string): string => {
  switch(type) {
    case 'communityGroup': 
      return 'bg-blue-100 text-blue-800';
    case 'employment':
      switch(value) {
        case 'BEKERJA': return 'bg-green-100 text-green-800';
        case 'TIDAK_BEKERJA': return 'bg-red-100 text-red-800';
        case 'PELAJAR': return 'bg-blue-100 text-blue-800';
        case 'MAHASISWA': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-700';
      }
    case 'education':
      switch(value) {
        case 'SD': return 'bg-yellow-100 text-yellow-800';
        case 'SMP': return 'bg-orange-100 text-orange-800';
        case 'SMA_SMK': return 'bg-blue-100 text-blue-800';
        case 'PERGURUAN_TINGGI': return 'bg-purple-100 text-purple-800';
        case 'TIDAK_SEKOLAH': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-700';
      }
    case 'gender':
      switch(value) {
        case 'PRIA': return 'bg-blue-100 text-blue-800';
        case 'WANITA': return 'bg-pink-100 text-pink-800';
        default: return 'bg-gray-100 text-gray-700';
      }
    case 'marital':
      switch(value) {
        case 'BELUM_KAWIN': return 'bg-gray-100 text-gray-800';
        case 'KAWIN': return 'bg-green-100 text-green-800';
        case 'CERAI': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-700';
      }
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
