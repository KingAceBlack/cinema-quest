{ pkgs }: {
  # Specify the desired version of Node.js
  packages = with pkgs; [
    (nodejs.override {
      nodejsVersion = "20.x"; # Specify a suitable version (20.x or higher)
    })
    pkgs.yarn
  ];
}