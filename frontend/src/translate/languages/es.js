const messages = {
	es: {
		translations: {
			signup: {
				title: "Regístrate",
				toasts: {
					success: "Colaborador creado exitosamente. ¡Inicia sesión!",
					fail: "Error al crear Colaborador. Verifica los datos proporcionados.",
				},
				form: {
					name: "Nombre",
					email: "Correo electrónico",
					password: "Contraseña",
					company: "Nombre de la empresa",
					phone: "Tu número (Whatsapp)"
				},
				buttons: {
					submit: "Registrarse",
					login: "Ya tienes una cuenta? ¡Inicia sesión!",
				},
			},
			login: {
				title: "Iniciar sesión",
				form: {
					email: "Correo electrónico",
					password: "Contraseña",
					forgetpsw: "Olvidaste tu contraseña?",
				},
				buttons: {
					submit: "Ingresar",
					register: "No tienes una cuenta? ¡Regístrate!",
				},
			},
			plans: {
				form: {
					name: "Nombre",
					users: "Colaboradores",
					connections: "Conexiones",
					campaigns: "Campañas",
					schedules: "Programaciones",
					enabled: "Habilitadas",
					disabled: "Deshabilitadas",
					clear: "Cancelar",
					delete: "Eliminar",
					save: "Guardar",
					yes: "Sí",
					no: "No",
					money: "$",
				},
			},
			companies: {
				title: "Registrar Empresa",
				form: {
					name: "Nombre de la Empresa",
					plan: "Plan",
					token: "Token",
					submit: "Registrar",
					success: "Empresa creada exitosamente",
				},
			},
			auth: {
				toasts: {
					success: "Inicio de sesión exitoso",
				},
				token: "Token",
			},
			dashboard: {
				charts: {
					perDay: {
						title: "Atenciones hoy: ",
					},
				},
			},
			connections: {
				title: "Conexiones",
				toasts: {
					deleted: "Conexión con WhatsApp eliminada exitosamente",
				},
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteMessage: "¿Estás seguro? Esta acción no se puede deshacer.",
					disconnectTitle: "Desconectar",
					disconnectMessage:
						"¿Estás seguro? Necesitarás escanear el código QR nuevamente.",
				},
				buttons: {
					add: "Agregar WhatsApp",
					disconnect: "Desconectar",
					tryAgain: "Intentar nuevamente",
					qrcode: "CÓDIGO QR",
					newQr: "Nuevo CÓDIGO QR",
					connecting: "Conectando",
				},
				toolTips: {
					disconnected: {
						title: "Error al iniciar sesión en WhatsApp",
						content:
							"Asegúrate de que tu teléfono esté conectado a Internet e inténtalo de nuevo, o solicita un nuevo código QR",
					},
					qrcode: {
						title: "Esperando lectura del código QR",
						content:
							"Haz clic en el botón 'CÓDIGO QR' y escanea el código QR con tu teléfono para iniciar la sesión",
					},
					connected: {
						title: "Conexión establecida",
					},
					timeout: {
						title: "Se perdió la conexión con el teléfono",
						content:
							"Asegúrate de que tu teléfono esté conectado a Internet y WhatsApp esté abierto, o haz clic en 'Desconectar' para obtener un nuevo código QR",
					},
				},
				table: {
					name: "Nombre",
					status: "Estado",
					lastUpdate: "Última actualización",
					default: "Predeterminado",
					actions: "Acciones",
					session: "Sesión",
				},
			},
			whatsappModal: {
				title: {
					add: "Agregar WhatsApp",
					edit: "Editar WhatsApp",
				},
				form: {
					name: "Nombre",
					default: "Predeterminado",
					sendIdQueue: "Cola",
					timeSendQueue: "Redirigir a la cola en X minutos",
					queueRedirection: "Redirección de Area",
					queueRedirectionDesc: "Selecciona una cola para redirigir a los contactos que no tienen cola",
					prompt: "Indicación",
					maxUseBotQueues: "Enviar bot X veces",
					timeUseBotQueues: "Intervalo en minutos entre envíos de bot",
					expiresTicket: "Cerrar chats abiertos después de X minutos",
					expiresInactiveMessage: "Mensaje de cierre por inactividad",
				},
				buttons: {
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
				},
				success: "WhatsApp guardado exitosamente",
			},
			qrCode: {
				message: "Escanea el código QR para iniciar sesión",
			},
			contacts: {
				title: "Contactos",
				toasts: {
					deleted: "Contacto eliminado exitosamente",
					deletedAll: "Todos los contactos fueron eliminados exitosamente!",
				},
				searchPlaceholder: "Buscar...",
				confirmationModal: {
					deleteTitle: "Eliminar",
					importTitlte: "Importar contactos",
					exportContact: "Exportar contatos",
					deleteMessage:
						"Estás seguro de que deseas eliminar este contacto? Se perderán todas las atenciones relacionadas.",
					importMessage: "Quieres importar todos los contactos del teléfono?",
					deleteAllMessage: "Estás seguro de que deseas eliminar todos los contactos? Se perderán todos los tickets relacionados..",
				},
				buttons: {
					import: "Importar Contactos",
					add: "Agregar Contacto",
					delete: "Eliminar todos los contactos",
					export: "Exportar contacto",
				},
				table: {
					name: "Nombre",
					whatsapp: "WhatsApp",
					email: "Correo electrónico",
					actions: "Acciones",
				},
			},
			queueIntegrationModal: {
				title: {
					add: "Agregar proyecto",
					edit: "Editar proyecto",
				},
				form: {
					id: "ID",
					type: "Tipo",
					name: "Nombre",
					projectName: "Nombre del Proyecto",
					language: "Idioma",
					jsonContent: "Contenido JSON",
					urlN8N: "URL",
					typebotSlug: "Typebot - Slug",
					typebotExpires: "Tiempo en minutos para expirar una conversación",
					typebotKeywordFinish: "Palabra para finalizar la conversación",
					typebotUnknownMessage: "Mensaje de opción inválida",
				},
				buttons: {
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
					test: "Probar Bot",
				},
				messages: {
					testSuccess: "Integración probada exitosamente",
					addSuccess: "Integración agregada exitosamente",
					editSuccess: "Integración editada exitosamente",
				},
			},
			promptModal: {
				form: {
					name: "Nombre",
					prompt: "Indicación",
					voice: "Voz",
					max_tokens: "Máximo de Tokens en la respuesta",
					temperature: "Temperatura",
					apikey: "Clave de API",
					max_messages: "Máximo de mensajes en el historial",
					voiceKey: "Clave de voz de API",
					voiceRegion: "Región de voz",
				},
				success: "Indicación guardada con éxito",
				title: {
					add: "Agregar Indicación",
					edit: "Editar Indicación",
				},
				buttons: {
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
				},
			},
			prompts: {
				title: "Indicaciones",
				table: {
					name: "Nombre",
					queue: "Área/Area",
					max_tokens: "Máximo de Tokens en la Respuesta",
					actions: "Acciones",
				},
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteMessage: "¿Estás seguro? ¡Esta acción no se puede deshacer!",
				},
				buttons: {
					add: "Agregar Indicación",
				},
			},
			contactModal: {
				title: {
					add: "Agregar contacto",
					edit: "Editar contacto",
				},
				form: {
					mainInfo: "Datos de contacto",
					extraInfo: "Información adicional",
					name: "Nombre",
					number: "Número de Whatsapp",
					email: "Correo electrónico",
					extraName: "Nombre del campo",
					extraValue: "Valor",
					whatsapp: "Conexión de origen: "
				},
				buttons: {
					addExtraInfo: "Agregar información adicional",
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
				},
				success: "Contacto guardado con éxito",
			},
			queueModal: {
				title: {
					add: "Agregar área",
					edit: "Editar área",
				},
				form: {
					name: "Nombre",
					color: "Color",
					greetingMessage: "Mensaje de saludo",
					complationMessage: "Mensaje de conclusión",
					outOfHoursMessage: "Mensaje fuera del horario",
					ratingMessage: "Mensaje de calificación",
					token: "Token",
					orderQueue: "Orden de la Area (Bot)",
					integrationId: "Integración",
				},
				buttons: {
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
				},
			},
			userModal: {
				title: {
					add: "Agregar Colaborador",
					edit: "Editar Colaborador",
				},
				form: {
					name: "Nombre",
					email: "Correo electrónico",
					password: "Contraseña",
					profile: "Perfil",
					whatsapp: "Conexión predeterminada"
				},
				buttons: {
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
				},
				success: "Colaborador guardado con éxito",
			},
			scheduleModal: {
				title: {
					add: "Nuevo Agendamiento",
					edit: "Editar Agendamiento",
				},
				form: {
					body: "Mensaje",
					contact: "Contacto",
					sendAt: "Fecha de Agendamiento",
					sentAt: "Fecha de Envío",
				},
				buttons: {
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
				},
				success: "Agendamiento guardado con éxito",
			},
			tagModal: {
				title: {
					add: "Nueva Etiqueta",
					edit: "Editar Etiqueta",
				},
				form: {
					name: "Nombre",
					color: "Color",
				},
				buttons: {
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
				},
				success: "Etiqueta guardada con éxito",
			},
			chat: {
				noTicketMessage: "Selecciona un ticket para comenzar a conversar.",
			},
			uploads: {
				titles: {
					titleUploadMsgDragDrop: "ARRASTRA Y SUELTA ARCHIVOS EN EL CAMPO ABAJO",
					titleFileList: "Lista de archivo(s)"
				},
			},
			ticketsManager: {
				buttons: {
					newTicket: "Nuevo",
				},
			},
			ticketsQueueSelect: {
				placeholder: "Colas",
			},
			tickets: {
				toasts: {
					deleted: "La atención que estabas manejando fue eliminada.",
				},
				notification: {
					message: "Mensaje de",
				},
				tabs: {
					open: { title: "Abiertos" },
					closed: { title: "Resueltos" },
					search: { title: "Búsqueda" },
				},
				search: {
					placeholder: "Buscar atención y mensajes",
				},
				buttons: {
					showAll: "Todo",
				},
			},
			transferTicketModal: {
				title: "Transferir Ticket",
				fieldLabel: "Escribe para buscar Colaboradores",
				fieldQueueLabel: "Transferir a la cola",
				fieldQueuePlaceholder: "Selecciona una cola",
				noOptions: "Ningún Colaborador encontrado con ese nombre",
				buttons: {
					ok: "Transferir",
					cancel: "Cancelar",
				},
			},
			ticketsList: {
				pendingHeader: "Pendientes",
				assignedHeader: "Atendiendo",
				noTicketsTitle: "¡Nada aquí!",
				noTicketsMessage:
					"No se encontraron atenciones con ese estado o término de búsqueda",
				buttons: {
					accept: "Aceptar",
					closed: "Finalizar",
					reopen: "Reabrir"
				},
			},
			newTicketModal: {
				title: "Crear Ticket",
				fieldLabel: "Escribe para buscar el contacto",
				add: "Agregar",
				buttons: {
					ok: "Guardar",
					cancel: "Cancelar",
				},
			},
			mainDrawer: {
				listItems: {
					dashboard: "Panel de control",
					connections: "Conexiones",
					tickets: "Atención",
					quickMessages: "Respuestas Rápidas",
					contacts: "Contactos",
					queues: "Areas y Chatbot",
					tags: "Etiquetas",
					kanban: "Kanban CRM",
					administration: "Administración",
					users: "Colaboradores",
					settings: "Configuraciones",
					helps: "Ayuda",
					todolist: "Tareas",
					messagesAPI: "API",
					schedules: "Agendamientos",
					campaigns: "Campañas",
					config: "Config Campañas",
					annoucements: "Informativos",
					chats: "Chat Interno",
					files: "Lista de archivos",
					prompts: "Open.Ai",
					financeiro: "Facturacion",
					queueIntegration: "Integraciones",
				},
				appBar: {
					user: {
						profile: "Perfil",
						logout: "Salir",
					},
				},
			},
			queueIntegration: {
				title: "Integraciones",
				table: {
					id: "ID",
					type: "Tipo",
					name: "Nombre",
					projectName: "Nombre del Proyecto",
					language: "Idioma",
					lastUpdate: "Última actualización",
					actions: "Acciones",
				},
				buttons: {
					add: "Agregar Proyecto",
				},
				searchPlaceholder: "Buscar...",
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteMessage:
						"¿Estás seguro? ¡Esta acción no se puede deshacer! y será eliminada de las colas y conexiones vinculadas",
				},
			},
			files: {
				title: "Lista de archivos",
				table: {
					name: "Nombre",
					contacts: "Contactos",
					actions: "Acción",
				},
				toasts: {
					deleted: "Lista eliminada exitosamente",
					deletedAll: "Todas las listas fueron eliminadas exitosamente",
				},
				buttons: {
					add: "Agregar",
					deleteAll: "Eliminar Todos",
				},
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteAllTitle: "Eliminar Todos",
					deleteMessage: "¿Estás seguro de que deseas eliminar esta lista?",
					deleteAllMessage: "¿Estás seguro de que deseas eliminar todas las listas?",
				},
			},
			messagesAPI: {
				title: "API",
				textMessage: {
					number: "Número",
					body: "Mensaje",
					token: "Token registrado",
				},
				mediaMessage: {
					number: "Número",
					body: "Nombre del archivo",
					media: "Archivo",
					token: "Token registrado",
				},
			},
			notifications: {
				noTickets: "Ninguna notificación.",
			},
			quickMessages: {
				title: "Respuestas Rápidas",
				searchPlaceholder: "Buscar...",
				noAttachment: "Sin adjunto",
				confirmationModal: {
					deleteTitle: "Eliminación",
					deleteMessage: "¡Esta acción es irreversible! ¿Deseas continuar?",
				},
				buttons: {
					add: "Agregar",
					attach: "Adjuntar Archivo",
					cancel: "Cancelar",
					edit: "Editar",
				},
				toasts: {
					success: "Atajo agregado exitosamente",
					deleted: "Atajo eliminado exitosamente",
				},
				dialog: {
					title: "Mensaje Rápido",
					shortcode: "Atajo",
					message: "Respuesta",
					save: "Guardar",
					cancel: "Cancelar",
					allowEdit: "Permitir editar",
					add: "Agregar",
					edit: "Editar",
					allowView: "Permitir vista",
				},
				table: {
					shortcode: "Atajo",
					message: "Mensaje",
					actions: "Acciones",
					mediaName: "Nombre del Archivo",
					status: "Estado",
				},
			},
			messageVariablesPicker: {
				label: "Variables disponibles",
				vars: {
					contactFirstName: "Primer Nombre",
					contactName: "Nombre",
					greeting: "Saludo",
					protocolNumber: "Protocolo",
					date: "Fecha",
					hour: "Hora",
				},
			},
			contactLists: {
				title: "Listas de Contactos",
				table: {
					name: "Nombre",
					contacts: "Contactos",
					actions: "Acciones",
				},
				buttons: {
					add: "Nueva Lista",
				},
				dialog: {
					name: "Nombre",
					company: "Empresa",
					okEdit: "Editar",
					okAdd: "Agregar",
					add: "Agregar",
					edit: "Editar",
					cancel: "Cancelar",
				},
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteMessage: "Esta acción no se puede deshacer.",
				},
				toasts: {
					deleted: "Registro eliminado",
				},
			},
			contactListItems: {
				title: "Contactos",
				searchPlaceholder: "Búsqueda",
				buttons: {
					add: "Nuevo",
					lists: "Listas",
					import: "Importar",
				},
				dialog: {
					name: "Nombre",
					number: "Número",
					whatsapp: "Whatsapp",
					email: "Correo Electrónico",
					okEdit: "Editar",
					okAdd: "Agregar",
					add: "Agregar",
					edit: "Editar",
					cancel: "Cancelar",
				},
				table: {
					name: "Nombre",
					number: "Número",
					whatsapp: "Whatsapp",
					email: "Correo Electrónico",
					actions: "Acciones",
				},
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteMessage: "Esta acción no se puede deshacer.",
					importMessage: "¿Quieres importar los contactos de esta hoja de cálculo?",
					importTitlte: "Importar",
				},
				toasts: {
					deleted: "Registro eliminado",
				},
			},
			campaigns: {
				title: "Campañas",
				searchPlaceholder: "Búsqueda",
				buttons: {
					add: "Nueva Campaña",
					contactLists: "Listas de Contactos",
				},
				table: {
					name: "Nombre",
					whatsapp: "Conexión",
					contactList: "Lista de Contactos",
					status: "Estado",
					scheduledAt: "Programada para",
					completedAt: "Completada",
					confirmation: "Confirmación",
					actions: "Acciones",
				},
				dialog: {
					new: "Nueva Campaña",
					update: "Editar Campaña",
					readonly: "Solo Lectura",
					form: {
						name: "Nombre",
						message1: "Mensaje 1",
						message2: "Mensaje 2",
						message3: "Mensaje 3",
						message4: "Mensaje 4",
						message5: "Mensaje 5",
						confirmationMessage1: "Mensaje de Confirmación 1",
						confirmationMessage2: "Mensaje de Confirmación 2",
						confirmationMessage3: "Mensaje de Confirmación 3",
						confirmationMessage4: "Mensaje de Confirmación 4",
						confirmationMessage5: "Mensaje de Confirmación 5",
						messagePlaceholder: "Contenido del mensaje",
						whatsapp: "Conexión",
						status: "Estado",
						scheduledAt: "Programada para",
						confirmation: "Confirmación",
						contactList: "Lista de Contactos",
						tagList: "Lista de Etiquetas",
						fileList: "Lista de Archivos"
					},
					buttons: {
						add: "Añadir",
						edit: "Editar",
						okadd: "Ok",
						cancel: "Cancelar Envíos",
						restart: "Reiniciar Envíos",
						close: "Cerrar",
						attach: "Adjuntar Archivo",
					},
				},
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteMessage: "Esta acción no se puede deshacer.",
				},
				toasts: {
					success: "Operación realizada con éxito",
					cancel: "Campaña cancelada",
					restart: "Campaña reiniciada",
					deleted: "Registro eliminado",
				},
			},
			announcements: {
				active: 'Activo',
				inactive: 'Inactivo',
				title: "Anuncios",
				searchPlaceholder: "Búsqueda",
				buttons: {
					add: "Nuevo Anuncio",
					contactLists: "Listas de Anuncios",
				},
				table: {
					priority: "Prioridad",
					title: "Título",
					text: "Texto",
					mediaName: "Archivo",
					status: "Estado",
					actions: "Acciones",
				},
				dialog: {
					edit: "Edición de Anuncio",
					add: "Nuevo Anuncio",
					update: "Editar Anuncio",
					readonly: "Solo Lectura",
					form: {
						priority: "Prioridad",
						title: "Título",
						text: "Texto",
						mediaPath: "Archivo",
						status: "Estado",
					},
					buttons: {
						add: "Añadir",
						edit: "Editar",
						okadd: "Ok",
						cancel: "Cancelar",
						close: "Cerrar",
						attach: "Adjuntar Archivo",
					},
				},
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteMessage: "Esta acción no se puede deshacer.",
				},
				toasts: {
					success: "Operación realizada con éxito",
					deleted: "Registro eliminado",
				},
			},
			campaignsConfig: {
				title: "Configuraciones de Campañas",
			},
			queues: {
				title: "Areas y Chatbot",
				table: {
					name: "Nombre",
					color: "Color",
					greeting: "Mensaje de Saludo",
					actions: "Acciones",
					orderQueue: "Orden en la cola (bot)",
				},
				buttons: {
					add: "Añadir Cola",
				},
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteMessage: "¿Estás seguro? Esta acción no se puede deshacer. Las atenciones de esta cola seguirán existiendo, pero no tendrán ninguna cola asignada.",
				},
			},
			queueSelect: {
				inputLabel: "Colas",
			},
			users: {
				title: "Colaboradores",
				table: {
					name: "Nombre",
					email: "Correo Electrónico",
					profile: "Perfil",
					actions: "Acciones",
				},
				buttons: {
					add: "Añadir Colaborador",
				},
				toasts: {
					deleted: "Colaborador eliminado con éxito.",
				},
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteMessage: "Todos los datos del Colaborador se perderán. Las atenciones abiertas de este Colaborador se moverán a la cola.",
				},
			},
			helps: {
				title: "Centro de Ayuda",
			},
			schedules: {
				title: "Agendamientos",
				confirmationModal: {
					deleteTitle: "¿Seguro que deseas eliminar este Agendamiento?",
					deleteMessage: "Esta acción no se puede deshacer.",
				},
				table: {
					contact: "Contacto",
					body: "Mensaje",
					sendAt: "Fecha de Programación",
					sentAt: "Fecha de Envío",
					status: "Estado",
					actions: "Acciones",
				},
				buttons: {
					add: "Nuevo Agendamiento",
				},
				toasts: {
					deleted: "Agendamiento eliminado con éxito.",
				},
			},
			tags: {
				title: "Etiquetas",
				confirmationModal: {
					deleteTitle: "¿Seguro que deseas eliminar esta Etiqueta?",
					deleteMessage: "Esta acción no se puede deshacer.",
				},
				table: {
					name: "Nombre",
					color: "Color",
					tickets: "Registros con Etiqueta",
					actions: "Acciones",
				},
				buttons: {
					add: "Nueva Etiqueta",
				},
				toasts: {
					deleted: "Etiqueta eliminada con éxito.",
				},
			},
			settings: {
				success: "Configuraciones guardadas exitosamente.",
				title: "Configuraciones",
				settings: {
					userCreation: {
						name: "Creación de Colaborador",
						options: {
							enabled: "Habilitado",
							disabled: "Deshabilitado",
						},
					},
				},
			},
			messagesList: {
				header: {
					assignedTo: "Asignado a:",
					buttons: {
						return: "Volver",
						resolve: "Resolver",
						reopen: "Reabrir",
						accept: "Aceptar",
					},
				},
			},
			messagesInput: {
				placeholderOpen: "Ingrese un mensaje",
				placeholderClosed:
					"Reabra o acepte este ticket para enviar un mensaje.",
				signMessage: "Firmar",
			},
			contactDrawer: {
				header: "Datos de contacto",
				buttons: {
					edit: "Editar contacto",
				},
				extraInfo: "Otra información",
			},
			fileModal: {
				title: {
					add: "Agregar lista de archivos",
					edit: "Editar lista de archivos",
				},
				buttons: {
					okAdd: "Guardar",
					okEdit: "Editar",
					cancel: "Cancelar",
					fileOptions: "Agregar archivo",
				},
				form: {
					name: "Nombre de la lista de archivos",
					message: "Detalles de la lista",
					fileOptions: "Lista de archivos",
					extraName: "Mensaje para enviar con el archivo",
					extraValue: "Valor de la opción",
				},
				success: "Lista de archivos guardada exitosamente.",
			},
			ticketOptionsMenu: {
				schedule: "Programación",
				delete: "Eliminar",
				transfer: "Transferir",
				registerAppointment: "Observaciones del Contacto",
				appointmentsModal: {
					title: "Observaciones del Contacto",
					textarea: "Observación",
					placeholder: "Inserte aquí la información que desea registrar",
				},
				confirmationModal: {
					title: "Eliminar ticket del contacto",
					message:
						"¡Atención! Se perderán todos los mensajes relacionados con el ticket.",
				},
				buttons: {
					delete: "Eliminar",
					cancel: "Cancelar",
				},
			},
			confirmationModal: {
				buttons: {
					confirm: "Aceptar",
					cancel: "Cancelar",
				},
			},
			messageOptionsMenu: {
				delete: "Eliminar",
				reply: "Responder",
				confirmationModal: {
					title: "¿Eliminar mensaje?",
					message: "Esta acción no se puede deshacer.",
				},
			},
			backendErrors: {
				ERR_NO_OTHER_WHATSAPP: "Debe haber al menos un WhatsApp predeterminado.",
				ERR_NO_DEF_WAPP_FOUND:
					"No se encontró ningún WhatsApp predeterminado. Verifique la página de conexiones.",
				ERR_WAPP_NOT_INITIALIZED:
					"Esta sesión de WhatsApp no ha sido inicializada. Verifique la página de conexiones.",
				ERR_WAPP_CHECK_CONTACT:
					"No se pudo verificar el contacto de WhatsApp. Verifique la página de conexiones.",
				ERR_WAPP_INVALID_CONTACT: "Este no es un número de WhatsApp válido.",
				ERR_WAPP_DOWNLOAD_MEDIA:
					"No se pudo descargar medios de WhatsApp. Verifique la página de conexiones.",
				ERR_INVALID_CREDENTIALS:
					"Error de autenticación. Por favor, intente nuevamente.",
				ERR_SENDING_WAPP_MSG:
					"Error al enviar mensaje de WhatsApp. Verifique la página de conexiones.",
				ERR_DELETE_WAPP_MSG: "No se pudo eliminar el mensaje de WhatsApp.",
				ERR_OTHER_OPEN_TICKET: "Ya hay un ticket abierto para este contacto.",
				ERR_SESSION_EXPIRED: "Sesión expirada. Por favor, inicie sesión.",
				ERR_USER_CREATION_DISABLED:
					"La creación de Colaboradores está deshabilitada por el administrador.",
				ERR_NO_PERMISSION: "No tiene permisos para acceder a este recurso.",
				ERR_DUPLICATED_CONTACT: "Ya existe un contacto con este número.",
				ERR_NO_SETTING_FOUND: "No se encontró ninguna configuración con este ID.",
				ERR_NO_CONTACT_FOUND: "No se encontró ningún contacto con este ID.",
				ERR_NO_TICKET_FOUND: "No se encontró ningún ticket con este ID.",
				ERR_NO_USER_FOUND: "No se encontró ningún Colaborador con este ID.",
				ERR_NO_WAPP_FOUND: "No se encontró ningún WhatsApp con este ID.",
				ERR_CREATING_MESSAGE: "Error al crear mensaje en la base de datos.",
				ERR_CREATING_TICKET: "Error al crear ticket en la base de datos.",
				ERR_FETCH_WAPP_MSG:
					"Error al recuperar el mensaje de WhatsApp, tal vez sea muy antiguo.",
				ERR_QUEUE_COLOR_ALREADY_EXISTS:
					"Este color ya está en uso, elija otro.",
				ERR_WAPP_GREETING_REQUIRED:
					"El mensaje de saludo es obligatorio cuando hay más de una Area.",
			},
		},
	},
};
export { messages };  