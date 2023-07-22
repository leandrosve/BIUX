import { useContext, useMemo } from "react";
import ShareButton from "../../components/common/ShareButton";
import { SessionContext } from "../../context/SessionProvider";
import { BRoutes } from "../../router/routes";

const SHARE_TEMPLATE =
  "{{name}} te está invitando a unirte como su alumno en BIUX!\nLink de registro: {{link}}\nCódigo de acceso: {{code}}";
const SHARE_SUBJECT = "Únete como mi alumn@ en BIUX!";
const InstructorShareButton = ({ code }: { code: string }) => {
  const { session } = useContext(SessionContext);
  const shareText = useMemo(() => {
    const name = `${session?.user.firstName} ${session?.user.lastName}`;
    const registerLink =
      window.location.origin + BRoutes.SIGNUP + "?tipo=alumno";
    return SHARE_TEMPLATE.replace("{{name}}", name)
      .replace("{{link}}", registerLink)
      .replace("{{code}}", code);
  }, [session?.user, code]);
  return (
    <ShareButton
      body={shareText}
      subject={SHARE_SUBJECT}
      label="Compartir Invitación"
    />
  );
};

export default InstructorShareButton;
