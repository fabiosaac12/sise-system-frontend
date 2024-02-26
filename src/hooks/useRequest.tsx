import { AxiosError } from "axios";

const defaultMessages = {
  404: "Recurso no encontrado",
  409: "El registro ya existe",
  500: "Ha ocurrido un problema en el servidor",
  401: "Credenciales incorrectas",
  400: "Los datos enviados contienen errores",
  error: "Ha ocurrido un error",
  accept: "Aceptar",
};

export const useRequest = <T, U>(
  request: (props: T) => Promise<U>,
  config?: {
    customMessages?: Partial<typeof defaultMessages>;
    showLoader?: boolean;
    showErrorModal?: boolean;
  }
): ((props: T) => Promise<U | undefined>) => {
  const {
    customMessages = {},
    showLoader = true,
    showErrorModal = true,
  } = config || {};

  // const loader = useLoader();
  // const modal = useModal();

  const messages = {
    ...defaultMessages,
    ...customMessages,
  };

  return async (props: T) => {
    // showLoader && loader.handleShow();

    try {
      const response = await request(props);

      // showLoader && loader.handleHide();

      return response;
    } catch (_error) {
      // showLoader && loader.handleHide();

      const error = _error as AxiosError;
      const code = error.response!.status as unknown as keyof typeof messages;

      console.log(messages[code]);

      // showErrorModal &&
      //   modal.handleOpen({
      //     content: (
      //       <InfoModal
      //         title={messages[code in messages ? code : 'error']}
      //         buttonText={messages.accept}
      //       />
      //     ),
      //   });
    }
  };
};
