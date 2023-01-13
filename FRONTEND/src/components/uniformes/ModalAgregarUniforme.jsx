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
import { createUniforme } from '../../features/uniformeSlice';

const ModalAgregarUniforme = ({ categorias }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        articulo: '',
        codigo: '',
        descripcion: '',
        cantidad: '',
        precio: '',
        talla: '',
        caracteristicas: '',
        categoria: '',
        img: '',
        observaciones: '',
        estado: true,
    }

    const [indice, setIndice] = useState(initialValues);

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIndice(initialValues);
    }

    const handleSave = () => {
        dispatch(createUniforme(indice));
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
                        <ModalHeader textAlign="center">AGREGAR UN NUEVO ARTÍCULO</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={2} mt={-4} direction="column" justifyContent="space-between" p={2}>
                                <Stack spacing={2} direction={{ base: 'column', lg: "row"}} justifyContent="space-between">
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>ARTÍCULO</FormLabel>
                                        <Input
                                            placeholder="Escibe el nombre del articulo"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, articulo: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>CODIGO</FormLabel>
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
                                        <FormLabel fontWeight={'semibold'}>CANTIDAD STOCK</FormLabel>
                                        <Input
                                            placeholder="100"
                                            type="number"
                                            onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>PRECIO</FormLabel>
                                        <Input
                                            placeholder="S/.49.90"
                                            type="number"
                                            onChange={(e) => setIndice({ ...indice, precio: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>TALLA</FormLabel>
                                        <Select 
                                            placeholder="Selecciona una opción" 
                                            onChange={(e) => setIndice({ ...indice, talla: e.target.value })}
                                        >
                                            <option value="XS">XS</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="XXL">XXL</option>
                                            <option value="OTRO">OTRO</option>
                                        </Select>
                                    </FormControl>
                                </Stack>

                                <Stack spacing={2} direction={{ base: 'column', lg: "row"}} justifyContent="stretch">
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                            onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>CATEGORÍA</FormLabel>
                                        <Select 
                                            placeholder="Selecciona una opción" 
                                            onChange={(e) => setIndice({ ...indice, categoria: e.target.value })}
                                        >
                                            { categorias.map((categoria) => (
                                                <option key={categoria._id} value={categoria?._id}>
                                                    {categoria?.nombre}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>

                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN CORTA</FormLabel>
                                    <Textarea
                                        placeholder="Escribe la descripcion del articulo"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                        rows={1}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>CARACTERISTICAS</FormLabel>
                                    <Textarea
                                        placeholder="Escribe caracteristicas del articulo"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, caracteristicas: e.target.value })}
                                        rows={1}
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
                                                rows={1}
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
                                disabled={ indice.articulo === '' || indice.codigo === '' || indice.categoria === '' || indice.talla === '' }
                            >
                                GUARDAR
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarUniforme