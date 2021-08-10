export type RecordProps = {
	id: string;
	time: number;
};

export type RecordComponentProps = {
	place: number;
	id: string;
	time: number;
	onAdd: (place: number) => void;
	onRemove: (id: string) => void;
};
