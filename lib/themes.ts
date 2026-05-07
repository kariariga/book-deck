import { ThemePreset } from '@/types';
export const themes: ThemePreset[] = [
  { name: 'Lavanda', backgroundColor: '#F4F0FF', textColor: '#35224A' },
  { name: 'Café', backgroundColor: '#F7F0E8', textColor: '#3E2C1E' },
  { name: 'Floresta', backgroundColor: '#ECF7EE', textColor: '#1D3B2A' },
  { name: 'Areia', backgroundColor: '#FFF8E8', textColor: '#52442A' },
  { name: 'Azul Noturno', backgroundColor: '#EAF0FF', textColor: '#172B59' }
];
export const defaultTheme = themes[0];
