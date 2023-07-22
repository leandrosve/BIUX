import {
  Button,
  Flex,
  Heading,
  IconButton,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { HideIcon } from "../../components/common/Icons";
import { CopyIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import InstructorService from "../../services/api/InstructorService";
import SkeletonWrapper from "../../components/common/SkeletonWrapper";
import ResponsiveCard from "../../components/common/ResponsiveCard";
import { useRef } from "react";
import useAlertDialog from "../../hooks/useAlertDialog";
import BAlert from "../../components/common/BAlert";
import InstructorShareButton from "./InstructorShareButton";

const InstructorCodeDisplay = () => {
  const [code, setCode] = useState("ASD123");
  const [successMessage, setSuccessMessage] = useState<string | null>();
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedTooltip, setCopiedTooltip] = useState(false);

  const dialog = useAlertDialog();
  const regenButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setCopiedTooltip(false);
    }, 2000);
    return () => clearTimeout(id);
  }, [copiedTooltip]);

  const retrieveCode = async () => {
    setLoading(true);
    const res = await InstructorService.getCode();
    if (res.hasError) return;
    setCode(res.data?.code);
    setLoading(false);
  };

  const regenerateCodeConfirmation = () => {
    dialog.show(
      "Regenerar código de acceso",
      "¿Estás seguro/a que deseas continuar? Los códigos que hayas generado previamente ya no podrán ser utilizados.",
      regenerateCode,
      {
        confirmText: "Sí, regenerar código",
        finalFocusRef: regenButtonRef,
      }
    );
  };

  const regenerateCode = async () => {
    setSuccessMessage(null);
    setLoading(true);
    const res = await InstructorService.regenerateCode();
    if (res.hasError) return;
    setCode(res.data?.code);
    setShowCode(true);
    setLoading(false);
    setSuccessMessage("Código de acceso regenerado.");
  };

  useEffect(() => {
    retrieveCode();
  }, []);
  return (
    <ResponsiveCard
      marginTop={5}
      alignItems="start"
      gap={3}
      minWidth="fit-content"
      minHeight="auto"
      defaultWidth="400px"
      defaultHeight="auto"
    >
      <Heading size="md">Código de instructor</Heading>
      <Text display="inline-flex" maxWidth="360px">
        Comparte este código con tus alumnos para que puedan unirse a tu grupo.
      </Text>
      <BAlert size="sm" status="info" description={successMessage} autoFocus />
      {dialog.render()}
      <SkeletonWrapper
        loading={loading}
        height="55px"
        fadeDuration={0.2}
        repeat={2}
        width="100%"
      >
        <Tag
          fontSize="1.5em"
          padding={3}
          alignSelf="stretch"
          letterSpacing={showCode ? "9px" : "16.5px"}
          colorScheme="primary"
          gap={5}
          justifyContent="space-between"
        >
          <Flex
            grow={1}
            justifyContent="center"
            aria-label="Codigo de Acceso"
            role="contentinfo"
          >
            {showCode ? code : "******"}
          </Flex>
          <Flex gap={2}>
            <Tooltip label="Mostrar/Ocultar" hasArrow>
              <IconButton
                onClick={() => setShowCode((p) => !p)}
                icon={
                  showCode ? (
                    <HideIcon fontSize="25px" />
                  ) : (
                    <ViewIcon fontSize="25px" />
                  )
                }
                aria-label={!showCode ? "Mostrar" : "Ocultar"}
              />
            </Tooltip>
            <Tooltip
              label={copiedTooltip ? "Código copiado!" : "Copiar"}
              placement={copiedTooltip ? "right" : "bottom"}
              isOpen={copiedTooltip ? true : undefined}
              hasArrow
            >
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCopiedTooltip(true);
                }}
                icon={<CopyIcon />}
                aria-label={"Copiar código de acceso"}
              />
            </Tooltip>
          </Flex>
        </Tag>
        <Flex
          justifyContent="space-between"
          alignSelf="stretch"
          alignItems="center"
          grow={1}
        >
          <Button
            size="sm"
            onClick={regenerateCodeConfirmation}
            leftIcon={<RepeatIcon />}
            ref={regenButtonRef}
          >
            Regenerar Código
          </Button>

          <InstructorShareButton code={code} />
        </Flex>
      </SkeletonWrapper>
    </ResponsiveCard>
  );
};

export default InstructorCodeDisplay;
