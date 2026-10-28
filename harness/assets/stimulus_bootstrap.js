// Le harnais doit exercer les VRAIS contrôleurs Guilloche dans Chromium.
// Les contrôleurs de recette sont copiés à la racine de assets/controllers :
// déclaration explicite pour préserver leurs identifiants publics ui--*. 
import { Application } from '@hotwired/stimulus';
import ButtonController from './controllers/button_controller.js';
import CarouselController from './controllers/carousel_controller.js';
import ComboboxController from './controllers/combobox_controller.js';
import CommandController from './controllers/command_controller.js';
import ConfirmDialogController from './controllers/confirm_dialog_controller.js';
import ContextMenuController from './controllers/context_menu_controller.js';
import DialogController from './controllers/dialog_controller.js';
import FileUploadController from './controllers/file_upload_controller.js';
import InputOtpController from './controllers/input_otp_controller.js';
import NavbarController from './controllers/navbar_controller.js';
import ResizableController from './controllers/resizable_controller.js';
import RosetteController from './controllers/rosette_controller.js';
import ScrollspyController from './controllers/scrollspy_controller.js';
import SealController from './controllers/seal_controller.js';
import SheetController from './controllers/sheet_controller.js';
import ToastController from './controllers/toast_controller.js';
import ToggleController from './controllers/toggle_controller.js';

const app = Application.start();
app.register('ui--button', ButtonController);
app.register('ui--carousel', CarouselController);
app.register('ui--combobox', ComboboxController);
app.register('ui--command', CommandController);
app.register('ui--confirm-dialog', ConfirmDialogController);
app.register('ui--context-menu', ContextMenuController);
app.register('ui--dialog', DialogController);
app.register('ui--file-upload', FileUploadController);
app.register('ui--input-otp', InputOtpController);
app.register('ui--navbar', NavbarController);
app.register('ui--resizable', ResizableController);
app.register('ui--rosette', RosetteController);
app.register('ui--scrollspy', ScrollspyController);
app.register('ui--seal', SealController);
app.register('ui--sheet', SheetController);
app.register('ui--toast', ToastController);
app.register('ui--toggle', ToggleController);

export { app };
