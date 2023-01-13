import React, { useState } from 'react'
import { 
    Button,
    FormControl, 
    FormHelperText, 
    FormLabel, 
    Icon,
    Input, 
    InputGroup, 
    InputRightElement, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Select, 
    Stack,
    Switch,
    Textarea 
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { createLibro } from '../../features/libroSlice';

const ModalAgregarLibro = ({ grados }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        titulo: '',
        nombre: '',
        codigo: '',
        descripcion: '',
        editorial: '',
        autor: '',
        cantidad: '',
        grado: '',
        img: '',
        observaciones: '',
        estado: true,
    }

    const [indice, setIndice] = useState(initialValues);

    let gradosFilter = grados.filter(grado => grado.modalidad?.nombre === "EDUCACION BASICA REGULAR");

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIndice(initialValues);
    }

    const handleSave = () => {
        dispatch(createLibro(indice));
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    return (
        <>
            <Button
                colorScheme="messenger"
                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" }}}
                aria-label="Agregar"
                leftIcon={<Icon as={VscAdd} fontSize="2xl" />}
                variant="solid"
                rounded={'none'}
                onClick={handleModalOpen}
            >
                Nuevo Registro
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="6xl">
                <ModalOverlay/>
                    <ModalContent _dark={{ bg: "primary.900" }} borderRadius="none">
                        <ModalHeader textAlign="center">REGISTRAR NUEVO LIBRO</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={2} mt={-4} direction="column" justifyContent="space-between" p={2}>
                                <Stack spacing={2} direction={{ base: 'column', lg: "row"}} justifyContent="space-between">
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>TITULO</FormLabel>
                                        <Input
                                            placeholder="Escibe el titulo del libro"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, titulo: e.target.value.toUpperCase() })}
                                            textTransform="uppercase"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>CODIGO</FormLabel>
                                        <Input
                                            placeholder="Escibe el codigo del libro"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, codigo: e.target.value })}
                                            textTransform="uppercase"
                                        />
                                        <FormHelperText textColor={'red.500'}>
                                            {
                                                indice.codigo.length > 0 && indice.codigo.length < 5 ? 'debe tener al menos 5 caracteres' : ''
                                            }
                                        </FormHelperText>
                                    </FormControl>
                                </Stack>

                                <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>NOMBRE</FormLabel>
                                        <Input
                                            placeholder="Nombre del libro"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                            textTransform="uppercase"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>GRADO</FormLabel>
                                        <Select 
                                            placeholder="Selecciona una opción" 
                                            onChange={(e) => setIndice({ ...indice, grado: e.target.value })}
                                        >
                                            { gradosFilter.map((grado) => (
                                                    <option key={grado._id} value={grado._id}>
                                                        {grado.nombre}
                                                    </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>

                                <FormControl isRequired>
                                    <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                                    <Textarea
                                        placeholder="Escribe la descripcion del libro"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                        rows={1}
                                    />
                                </FormControl>

                                <Stack spacing={2} direction={{ base: 'column', lg: "row"}} justifyContent="space-between">
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>EDITORIAL</FormLabel>
                                        <Input
                                            placeholder="SANTILLANA"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, editorial: e.target.value })}
                                        />
                                        <FormHelperText textColor={'red.500'}>
                                            {
                                                indice.editorial.length > 0 && indice.editorial.length < 3 ? 'debe tener al menos 3 caracteres' : ''
                                            }
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>AUTOR</FormLabel>
                                        <Input
                                            placeholder="SANTILLANA"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, autor: e.target.value })}
                                        />
                                        <FormHelperText textColor={'red.500'}>
                                            {
                                                indice.autor.length > 0 && indice.autor.length < 3 ? 'debe tener al menos 3 caracteres' : ''
                                            }
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>CANTIDAD</FormLabel>
                                        <Input
                                            placeholder="100"
                                            type="number"
                                            onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack spacing={2}>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                            onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                                        <InputGroup size='md'>
                                            <Textarea
                                                defaultValue={indice ? indice.observaciones : ''}
                                                type="text"
                                                onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                                placeholder="Escribe las observaciones acerca del libro"
                                                rows={1}
                                            />
                                            <InputRightElement width='4rem'>
                                                <Switch onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} value={indice ? indice.estado : null} colorScheme="purple" isChecked={indice.estado === true ? true : false} size='lg' />
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter mt={-4}>
                            <Button 
                                colorScheme="red" 
                                _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" }}} 
                                size="lg" 
                                mr={3} 
                                onClick={handleModalClose}
                                borderRadius="none"
                            >
                                CANCELAR
                            </Button>
                            <Button 
                                colorScheme="messenger" 
                                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" }}} 
                                size="lg" 
                                mr={3} 
                                onClick={handleSave}
                                disabled={ indice.titulo === '' || indice.nombre === '' || indice.descripcion === '' || indice.codigo === '' || indice.grado === '' }
                                borderRadius="none"
                            >
                                GUARDAR
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarLibro