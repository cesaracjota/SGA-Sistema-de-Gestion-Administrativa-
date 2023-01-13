import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    Button,
    Icon,
    Flex,
  } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { AiOutlineAlert } from 'react-icons/ai';
import { deletePersona } from '../../features/personaSlice';

export const AlertEliminarPersona = ({ row }) => {

    const dispatch = useDispatch();

    const [isOpenAlert , setIsOpenAlert] = useState(false);

    const handleOpenAlert = () => {
        setIsOpenAlert(true);
    }

    const handleCloseAlert = () => {
        setIsOpenAlert(false);
    }

    const handleDelete = (id) => {
        dispatch(deletePersona(id));
    }

    return (
        <>
            <IconButton
                aria-label="Eliminar"
                onClick={() => handleOpenAlert(row.uid)}
                icon={<Icon as={MdDelete} />}
                fontSize="2xl"
                colorScheme="red"
                color="white"
                _dark={{ bg: "red.600", color: "white", _hover: { bg: "red.800" }}}
                ml={1}
            />
            <AlertDialog
                motionPreset='slideInBottom'
                onClose={handleCloseAlert}
                isOpen={isOpenAlert}
                isCentered
                size="xl"
            >
                <AlertDialogOverlay
                    bg="rgba(0,0,0,0.7)"
                    backdropFilter='auto'
                    backdropBlur='2px'
                />

                <AlertDialogContent py={6} _dark={{ bg: "primary.900"}} borderRadius="none">
                    <Flex textAlign="center" justifyContent="center" p={2}>
                        <Icon as={AiOutlineAlert} fontSize="9xl" color="red.500" />
                    </Flex>
                    <AlertDialogHeader textAlign="center" fontSize="3xl">¿Está seguro de eliminar? </AlertDialogHeader>
                    <AlertDialogBody textAlign="center" fontSize="xl">
                        ¡No podrás revertir esto!
                    </AlertDialogBody>
                    <AlertDialogFooter justifyContent="center" fontWeight="normal">
                        <Button 
                            onClick={handleCloseAlert} 
                            colorScheme="red" 
                            size="lg"
                            _dark={{ bg: "red.600", color: "white", _hover: { bg: "red.800" }}}
                        >
                            CANCELAR
                        </Button>
                        <Button 
                            colorScheme="green" 
                            ml={3} 
                            onClick={ () => handleDelete(row.uid) } 
                            size="lg"
                            _dark={{ bg: "green.600", color: "white", _hover: { bg: "green.800" }}}
                        >
                            ¡SÍ BÓRRALO!
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}