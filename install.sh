mkdir -p "$HOME"/.light/light
PATH_FOLDER="$HOME"/.light/light/bin
mkdir -p "$PATH_FOLDER"
git clone https://github.com/secondary-smiles/light-core.git "$HOME"/.light/light/light-core

PATH_EXPORT="export PATH="$PATH_FOLDER:'$PATH'

case "$(basename "$SHELL")" in
bash)
  HOME_FILE="$HOME"/.bashrc

  if grep -q "$PATH_EXPORT" "$HOME_FILE"; then
    # Do nothing
    :
  else
    echo "$PATH_EXPORT" >>"$HOME_FILE"
  fi
  ;;
zsh)
  HOME_FILE="$HOME"/.zshrc

  if grep -Fqx "$PATH_EXPORT" "$HOME_FILE"; then
    # Do nothing
    : ;
  else
    echo "$PATH_EXPORT" >>"$HOME_FILE" ;
  fi
  ;;
*)
  echo "Couldn't determine shell init file."
  echo "$PATH_FOLDER} should be added to your '\$PATH' variable."
  echo "For example: $PATH_EXPORT"
  ;;
esac

# TODO: compile & install program binary
