import './styles/app.scss';
import { startStimulusApp } from '@symfony/stimulus-bridge';

export const app = startStimulusApp(import.meta.glob('./controllers/*.js', { eager: true }));
