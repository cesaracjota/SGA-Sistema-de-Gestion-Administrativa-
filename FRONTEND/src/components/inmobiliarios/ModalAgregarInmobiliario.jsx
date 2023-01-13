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
import { createInmobiliario } from '../../features/inmobiliarioSlice';

const ModalAgregarInmobiliario = ({ grados }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        nombre: '',
        codigo: '',
        descripcion: '',
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
        dispatch(createInmobiliario(indice));
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
                        <ModalHeader textAlign="center">AGREGAR UNA NUEVO INMOBILIARIO</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} mt={-4} direction="column" justifyContent="space-between" p={2}>
                                <Stack spacing={2} direction={{ base: 'column', lg: "row"}} justifyContent="space-between">
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>NOMBRE</FormLabel>
                                        <Input
                                            placeholder="Escibe el nombre"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>CÓDIGO</FormLabel>
                                        <Input
                                            placeholder="Escribe el codigo del articulo"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, codigo: e.target.value.toUpperCase() })}
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
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>CANTIDAD</FormLabel>
                                        <Input
                                            placeholder="100"
                                            type="number"
                                            onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>GRADOS</FormLabel>
                                        <Select 
                                            placeholder="Selecciona una opción" 
                                            onChange={(e) => setIndice({ ...indice, grado: e.target.value })}
                                        >
                                            { gradosFilter.map((grado) => (
                                                <option key={grado._id} value={grado?._id}>
                                                    {grado?.nombre}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>

                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                        onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                                    <Textarea
                                        placeholder="Escribe la descripcion"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                        rows={2}
                                    />
                                </FormControl>
                                <Stack spacing={2}>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                                        <InputGroup size='md'>
                                            <Textarea
                                                defaultValue={indice ? indice.observaciones : ''}
                                                type="text"
                                                onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                                placeholder="Escribe las observaciones acerca del articulo"
                                                rows={2}
                                            />
                                            <InputRightElement width='4rem'>
                                                <Switch onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} value={ indice ? indice.estado : false } colorScheme="purple" isChecked={indice ? indice.estado : false } size='lg' />
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter mt={-4}>
                            <Button colorScheme="red" _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" }}} size="lg" mr={3} onClick={handleModalClose}>
                                CANCELAR
                            </Button>
                            <Button 
                                colorScheme="messenger" 
                                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" }}} 
                                size="lg" 
                                mr={3} 
                                onClick={handleSave}
                                disabled={ indice.nombre === '' || indice.codigo === '' || indice.grado === '' }
                            >
                                GUARDAR
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarInmobiliario;